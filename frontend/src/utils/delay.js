export default function delay(delayFor = 100) {
  return new Promise((resolve) => setTimeout(resolve, delayFor));
}
