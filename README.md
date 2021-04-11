# About this repo
This is my COMP6841 something awesome project! It disguises itself as a
harmless commit message generator. While it does some evil things in the background.
As of the latest commit, it is stealing cookies, and logging keystrokes to
capture credentials. To assist in capturing credentials, some input data is
also captured directly.

---

# The 3 parts of this project
## 1. The 'backend'
This is the cookie provider. Its only useful for testing purposes. It can
give the user a random cookie with this format: `FLAG{XXXXXXXXXX}`. Then user
can also verify whether the cookie is valid. Use `python3 -m http.server` in
this directory.

## 2. The 'receiver'
This is the server that you can send cookies and keystroke logs to. Why not
use requestbin? Ans: its a lot faster to test locally, and also reduce the
risk of self-pwning(especially during tests, last thing I want is my cookies
being dumped online). It also has some extra features like checking user's
unique ID so that we don't get spam with junk by some other jealous 'threat
actor'. Its not so robust right now, since its only checking for any string
with length 10. In 'production' the extension should request a valid id from
the 'receiver'. To get this up and running, run: `npm i; node index.js`

## 3. The 'root' folder
This contains mostly the files needed for the extension.
* `manifest.json` tells chrome what kind of permission we need and what URL its
  allowed on, also tells chrome what scripts to use
* `background.js` is the background script file. This is where I did most of
  the chrome API interactions. Its doing most of the `fetch`-ing so that users
  can't really easily notice some random requests to random servers. This is
  also where the cookie-stealing code resides.
* `keylog.js`, well its pretty obvious what this script is doing. It was not as
  trivial as I initially thought. My main stumbling block was modern websites
  that has an 'app'-like feel (google and twitter for example). I tried a few
  things, such as repeatedly try to attach listeners. I don't really notice any
  performance hitch. Also had to do some weird stuff with the focus and blur events.
  Still not entirely sure why input fields has to blur and refocus in order
  for my event listeners to be properly attached.
* `popup.js && popup.html && style.css`, this is the 'main' part of the
  extension. It queries the url and returns a random commit message. I also
  added some styles and some animations to make it look cooler, and hopefully
  slightly more legit-looking.

---

# Installing the extension
* If you have access to the machine, you can just install it by clicking 'Load
  unpacked' button at `chrome://extensions` (Make sure developer mode is
  turned on).
* Through chrome store, I didn't try this part out. It requires $$$. However in
  theory, it can work but not as effective as other method if the user reads
  what kind of permission you're asking. This depends on what the 'legit' part
  of the extension is. For example, its strange for a commit message
  generator to access your cookies.
* Drive-by installation(on Windows). If you have an installer, you can unpack
  your extension somewhere on the disk and use Registry Editor. For 64bit
  machines, create key at
  `HKEY_LOCAL_MACHINE\Software\Wow6432Node\Google\Chrome\Extensions`. Your
  key has to be the same ID as the extension. Probably would still require a
  google developer account. This method would install the extension on every
  chrome profile. Here's the complete alternative installation methods:
  [LINK](https://developer.chrome.com/docs/extensions/mv3/external_extensions/)

---

**Random remarks:**
I just got an idea on how to more effectively get keystrokes/form data.
Instead of searching the entire DOM for attributes that contains 'username'
or 'password', I could probably just use `document.activeElement` which would
return the currently selected element. From there, I could filter out to only
check/capture input tags.

---

# Marking criteria
* High distinction — has keylogging functions
* Distinction — doesn't look suspicious, looks like a normal extension
* Credit — Send cookies via the internet
* Pass — Steals cookies


# TODO
* [x] Make a simple extension
* [x] Steal cookie via `chrome.cookies`, console.log that thing
* [x] Use requestbin/etc to send it back
* [ ] Maybe even try sniff requests ('network' page in chrome dev tool), can get tokens (refer: `chrome.webRequest`)?
* [x] Build a git commit message generator extension. Just query `fetch("http://whatthecommit.com/index.txt")`
* [x] Keylogging??? We'll see
* [x] Send keylogged info to remote