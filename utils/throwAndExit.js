module.exports = function throwAndExit(errorMessage) {
  console.error(`[ERROR]: ${errorMessage}`)
  console.error("Exiting...")
  process.exit(1)
}
