const { total = 0 } = await chrome.storage.local.get("total")

async function setBackground() {
  const random = Math.floor(Math.random() * total)
  const image = await chrome.storage.local.get(String(random)).then(res => res[random])
  document.body.style.backgroundImage = `url(${image})`
}

if (total) setBackground()

document.onkeydown = (e) => {
  if (e.code === "Space") setBackground()
}
