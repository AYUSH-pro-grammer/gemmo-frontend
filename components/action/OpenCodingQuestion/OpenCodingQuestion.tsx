'use client'

import { useEffect, useMemo, useState } from "react"
import styles from "./openCodingQuestion.module.css"

type testcase = {
    id?: string
    input?: string
    output?: string
    explanation?: string
    is_sample?: boolean
}

type codingQuestion = {
    id: string
    title: string
    description: string

    input_format: string
    output_format: string

    constraints: string
    hints: string
    explanation?: string

    starter_code: string
    solution_code?: string
    difficulty: string

    time_limit_ms: number
    memory_limit_ms: number

    sample_testcases?: testcase[]
}

type propsData = {
    data: codingQuestion
    onClose: () => void
}

type compilerOption = {
    label: string
    value: string
}

const FALLBACK_COMPILERS: compilerOption[] = [
    { label: "Python 3.14", value: "python-3.14" },
    { label: "C GCC 15", value: "gcc-15" },
    { label: "C++ G++ 15", value: "g++-15" },
    { label: "Java OpenJDK 25", value: "openjdk-25" },
    { label: "C# .NET SDK 9", value: "dotnet-csharp-9" },
    { label: "F# .NET SDK 9", value: "dotnet-fsharp-9" },
    { label: "PHP 8.5", value: "php-8.5" },
    { label: "Ruby 4.0", value: "ruby-4.0" },
    { label: "Haskell GHC 9.12", value: "haskell-9.12" },
    { label: "Go 1.26", value: "go-1.26" },
    { label: "Rust 1.93", value: "rust-1.93" },
    { label: "TypeScript Deno", value: "typescript-deno" },
]

function normalizeOutput(value: string) {
    return value.replace(/\r\n/g, "\n").trim()
}

export default function OpenCodingQuestion({ data, onClose }: propsData) {
    const [open, setOpen] = useState(false)
    const [code, setCode] = useState(data.starter_code || "")
    const [output, setOutput] = useState("")
    const [stdinInput, setStdinInput] = useState("")

    const [running, setRunning] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const [compilers, setCompilers] = useState<compilerOption[]>(FALLBACK_COMPILERS)
    const [selectedCompiler, setSelectedCompiler] = useState("python-3.14")

    const [selectedExampleIndex, setSelectedExampleIndex] = useState(0)

    useEffect(() => {
        setOpen(true)
    }, [])

    useEffect(() => {
        const fetchCompilers = async () => {
            try {
                const resp = await fetch("http://127.0.0.1:8000/api/compilers/")
                const raw = await resp.json()

                const mapped: compilerOption[] = Array.isArray(raw)
                    ? raw.map((item: any) => {
                        if (typeof item === "string") {
                            return { label: item, value: item }
                        }

                        return {
                            label: item.label || item.name || item.title || item.compiler || item.value || "Compiler",
                            value: item.value || item.compiler || item.id || item.name || item.label,
                        }
                    }).filter((x: compilerOption) => Boolean(x.value))
                    : FALLBACK_COMPILERS

                if (mapped.length > 0) {
                    setCompilers(mapped)
                    const hasPython = mapped.some((c) => c.value === "python-3.14")
                    setSelectedCompiler(hasPython ? "python-3.14" : mapped[0].value)
                }
            } catch {
                setCompilers(FALLBACK_COMPILERS)
                setSelectedCompiler("python-3.14")
            }
        }

        fetchCompilers()
    }, [])

    useEffect(() => {
        if (data.starter_code) {
            setCode(data.starter_code)
        }
    }, [data.starter_code])

    const examples = useMemo(() => {
        return data.sample_testcases || []
    }, [data.sample_testcases])

    const activeExample = examples[selectedExampleIndex]

    const handleOff = () => {
        setOpen(false)
        setTimeout(() => {
            onClose()
        }, 250)
    }

    const runOnce = async (inputData: string) => {
        const req = await fetch("http://127.0.0.1:8000/compiler/run", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                compiler: selectedCompiler,
                code,
                input: inputData
            })
        })

        return await req.json()
    }

    const handleRun = async () => {
        try {
            setRunning(true)
            setOutput("")

            const inputToUse = stdinInput.trim().length > 0
                ? stdinInput
                : (activeExample?.input || "")

            const res = await runOnce(inputToUse)

            if (res.success) {
                setOutput(res.output || "")
            } else {
                setOutput(res.error || "Runtime error")
            }
        } catch {
            setOutput("Failed to run code.")
        } finally {
            setRunning(false)
        }
    }

    const handleSubmit = async () => {
        try {
            setSubmitting(true)
            setOutput("")

            if (!examples.length) {
                setOutput("No sample testcases available.")
                return
            }

            let passed = 0
            const failed: string[] = []

            for (let i = 0; i < examples.length; i++) {
                const tc = examples[i]
                const res = await runOnce(tc.input || "")

                if (!res.success) {
                    failed.push(
                        `Example ${i + 1}: runtime error\n${res.error || "Unknown error"}`
                    )
                    continue
                }

                const actual = normalizeOutput(res.output || "")
                const expected = normalizeOutput(tc.output || "")

                if (actual === expected) {
                    passed += 1
                } else {
                    failed.push(
                        `Example ${i + 1}: wrong answer\nExpected: ${tc.output}\nGot: ${res.output}`
                    )
                }
            }

            if (passed === examples.length) {
                setOutput(`Accepted\nPassed ${passed}/${examples.length} sample testcases.`)
            } else {
                setOutput(
                    `Not accepted\nPassed ${passed}/${examples.length} sample testcases.\n\n${failed.join("\n\n")}`
                )
            }
        } catch {
            setOutput("Failed to submit code.")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className={`${styles.box} ${open ? styles.open : styles.close}`}>
            <section className={styles.mainBox}>

                <div className={styles.header}>
                    <div>
                        <h2>{data.title}</h2>

                        <div className={styles.metaData}>
                            <span>{data.difficulty}</span>
                            <span>{data.time_limit_ms} ms</span>
                            <span>{data.memory_limit_ms} MB</span>
                        </div>
                    </div>

                    <button className={styles.closeButton} onClick={handleOff}>
                        Close
                    </button>
                </div>

                <div className={styles.contentLayout}>
                    <div className={styles.leftSide}>
                        <div className={styles.sectionBox}>
                            <h3>Description</h3>
                            <p>{data.description}</p>
                        </div>

                        <div className={styles.sectionBox}>
                            <h3>Input Format</h3>
                            <p>{data.input_format}</p>
                        </div>

                        <div className={styles.sectionBox}>
                            <h3>Output Format</h3>
                            <p>{data.output_format}</p>
                        </div>

                        <div className={styles.sectionBox}>
                            <h3>Constraints</h3>
                            <p>{data.constraints}</p>
                        </div>

                        {examples.map((item, index) => {
                            return (
                                <div className={styles.exampleBox} key={item.id || index}>
                                    <h4>Example {index + 1}</h4>

                                    <div className={styles.ioBox}>
                                        <span>Input</span>
                                        <pre>{item.input}</pre>
                                    </div>

                                    <div className={styles.ioBox}>
                                        <span>Output</span>
                                        <pre>{item.output}</pre>
                                    </div>

                                    {item.explanation ? (
                                        <div className={styles.ioBox}>
                                            <span>Explanation</span>
                                            <pre>{item.explanation}</pre>
                                        </div>
                                    ) : null}
                                </div>
                            )
                        })}
                    </div>

                    <div className={styles.rightSide}>
                        <div className={styles.editorHeader}>
                            <div className={styles.editorHeaderLeft}>
                                <h3>Code</h3>

                                <select
                                    className={styles.languageSelect}
                                    value={selectedCompiler}
                                    onChange={(e) => setSelectedCompiler(e.target.value)}
                                >
                                    {compilers.map((compiler) => (
                                        <option key={compiler.value} value={compiler.value}>
                                            {compiler.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.actionButtons}>
                                <button
                                    className={styles.submitButton}
                                    onClick={handleSubmit}
                                    disabled={submitting || running}
                                >
                                    {submitting ? "Submitting..." : "Submit"}
                                </button>

                                <button
                                    className={styles.runButton}
                                    onClick={handleRun}
                                    disabled={running || submitting}
                                >
                                    {running ? "Running..." : "Run"}
                                </button>
                            </div>
                        </div>

                        <div className={styles.examplePickerRow}>
                            <span className={styles.examplePickerLabel}>Run on example</span>

                            <select
                                className={styles.exampleSelect}
                                value={selectedExampleIndex}
                                onChange={(e) => setSelectedExampleIndex(Number(e.target.value))}
                                disabled={!examples.length}
                            >
                                {examples.length ? (
                                    examples.map((_, index) => (
                                        <option key={index} value={index}>
                                            Example {index + 1}
                                        </option>
                                    ))
                                ) : (
                                    <option value={0}>No examples</option>
                                )}
                            </select>
                        </div>

                        <div className={styles.inputBoxWrap}>
                            <div className={styles.inputBoxHeader}>
                                <h4>Input</h4>
                                <span>
                                    Used for Run only
                                </span>
                            </div>

                            <textarea
                                className={styles.inputBox}
                                value={stdinInput}
                                onChange={(e) => setStdinInput(e.target.value)}
                                placeholder={activeExample?.input || "Write custom input here"}
                                spellCheck={false}
                            />
                        </div>

                        <textarea
                            className={styles.editor}
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            spellCheck={false}
                        />

                        <div className={styles.outputBox}>
                            <h4>Output</h4>
                            <pre>{output}</pre>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}