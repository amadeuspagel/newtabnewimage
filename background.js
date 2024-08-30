chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "addImageToNewTab",
    title: "Add image to New Tab backgrounds",
    contexts: ["image"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "addImageToNewTab") {
    addImageToStorage(info.srcUrl);
  }
});

async function addImageToStorage(imageUrl) {
  const { total = 0 } = await chrome.storage.local.get("total");

  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const reader = new FileReader();

    reader.onloadend = async () => {
      await chrome.storage.local.set({
        [total]: reader.result,
        total: total + 1,
      });
    };

    reader.readAsDataURL(blob);
  } catch (error) {
    console.error("Error adding image:", error);
  }
}
