const { total = 0 } = await chrome.storage.local.get("total")

if (total) {
  const random = Math.floor(Math.random() * total)
  const image = await chrome.storage.local.get(String(random)).then(res => res[random])
  document.body.style.backgroundImage = `url(${image})`
}

const input = document.querySelector("input")

input.onchange = async (e) => {
  let index = 0
  for (const file of input.files) {


    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        chrome.storage.local.set({
          [index++]: reader.result
        })
        document.body.style.backgroundImage = `url(${reader.result})`
      },
      false
    );

    if (file) reader.readAsDataURL(file)
  }

  chrome.storage.local.set({ total: total + input.files.length })
}
