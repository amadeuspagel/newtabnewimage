chrome.runtime.onInstalled.addListener(
  () => chrome.storage.local.set({ total: 0 })
)
