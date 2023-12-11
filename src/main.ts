export const run = async () => {
    const file = `./${process.argv[2]}.ts`
    const { solve } = await import(file) as { solve: () => Promise<void> }
    solve().then(console.log)
}

run()