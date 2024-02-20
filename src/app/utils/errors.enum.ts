export enum Errors {
    MissingConnection = "The server was unable to establish a connection with the user",
    MissingStream = "The server was unable to get your camera feed",
    MissingPeer = "The server has lost your connection to the peer web",
    MissingSocket = "The server has lost your connection to the socket",
    MissingUserData = "The server is quite sure you f*cked around with the storage of the browser, don\'t do that"
}