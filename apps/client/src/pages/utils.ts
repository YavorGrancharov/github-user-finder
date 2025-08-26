export const openInNewTab = (url: string): void => {
  window.open(url, "_blank", "noopener,noreferrer");
};
// 3.	"noopener,noreferrer" → these are security and privacy flags:
// •	noopener → prevents the new page from getting a reference to the window.opener object.
// •	Without it, the new page could run window.opener.location = "malicious-site.com" and redirect your current page.
// •	noreferrer → prevents the browser from sending the Referer header (so the new page won’t see the URL of the page that opened it).
