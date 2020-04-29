This is a demo React App for users to search songs and add it to their existing Spotify playlist.

Get start:
1. Clone the project and run "npm install"
2. "cd authSever" and run "npm install" to install the package for authSever.
3. "cd .." to go back to the root of the project and run "npm start" (start localhost:3000 for UI and localhost:8888 for the sever).
4. If port:3000 is not open automatically, open "http://localhost:3000/" in browser.

Basic function:
1. Get playlist of the user: As a demo, currently have no pagination. It only show the top 20 items from the backend.
2. Add new playlist: With the input in playlist function, user can create new playlists.
3. Search for songs.
4. Add the selected song in search list to a playlist.
5. Error handler: user will be rederict to localhost:8888 when token expire.

Further improvment:
1. According to the current requirements, only one page is enough for this App. However, router should be involve when redirect is needed.
2. State management.
3. Unit test and mock server. Can involve Jest for unit test or use Express to mock res data locally. 
4. Should integarate typescript in use interface to identify data type.