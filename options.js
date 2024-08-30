const { total = 0 } = await chrome.storage.local.get("total");

const input = document.querySelector("input");
const imageList = document.createElement("ul");
document.body.appendChild(imageList);

input.onchange = async (e) => {
  await handleFiles(input.files);
};

async function handleFiles(files) {
  let index = 0;
  for (const file of files) {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      async () => {
        await chrome.storage.local.set({
          [total + index]: reader.result,
        });
        updateImageList();
        index++;
      },
      false
    );

    if (file) reader.readAsDataURL(file);
  }

  await chrome.storage.local.set({ total: total + files.length });
}

async function updateImageList() {
  const { total = 0 } = await chrome.storage.local.get("total");
  imageList.innerHTML = "";
  for (let i = 0; i < total; i++) {
    const image = await chrome.storage.local
      .get(String(i))
      .then((res) => res[i]);
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = image;
    img.style.width = "100px";
    li.appendChild(img);
    imageList.appendChild(li);
  }
}

updateImageList();
