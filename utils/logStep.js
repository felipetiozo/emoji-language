const steps = {}

module.exports = function(stepName, wasFinished) {
  if (wasFinished) {
    const duration = new Date() - steps[stepName]
    console.log(`[FINISHED] - ${stepName} - ${duration}ms\n`)
  } else {
    steps[stepName] = new Date()
    console.log(`[STARTING] - ${stepName}`)
  }
}
