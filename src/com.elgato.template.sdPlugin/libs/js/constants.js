const SocketErrors = {
    0: 'The connection has not yet been established',
    1: 'The connection is established and communication is possible',
    2: 'The connection is going through the closing handshake',
    3: 'The connection has been closed or could not be opened',
    1000: 'Normal Closure. The purpose for which the connection was established has been fulfilled.',
    1001: 'Going Away. An endpoint is "going away", such as a server going down or a browser having navigated away from a page.',
    1002: 'Protocol error. An endpoint is terminating the connection due to a protocol error',
    1003: "Unsupported Data. An endpoint received a type of data it doesn't support.",
    1004: '--Reserved--. The specific meaning might be defined in the future.',
    1005: 'No Status. No status code was actually present.',
    1006: 'Abnormal Closure. The connection was closed abnormally, e.g., without sending or receiving a Close control frame',
    1007: 'Invalid frame payload data. The connection was closed, because the received data was not consistent with the type of the message (e.g., non-UTF-8 [http://tools.ietf.org/html/rfc3629]).',
    1008: 'Policy Violation. The connection was closed, because current message data "violates its policy". This reason is given either if there is no other suitable reason, or if there is a need to hide specific details about the policy.',
    1009: 'Message Too Big. Connection closed because the message is too big for it to process.',
    1010: "Mandatory Extension. Connection is terminated the connection because the server didn't negotiate one or more extensions in the WebSocket handshake.",
    1011: 'Internl Server Error. Connection closed because it encountered an unexpected condition that prevented it from fulfilling the request.',
    1015: "TLS Handshake. The connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can't be verified).",
};

/**
 * Events
 */
const DID_RECEIVE_SETTINGS = 'didReceiveSettings';
const DID_RECEIVE_GLOBAL_SETTINGS = 'didReceiveGlobalSettings';
const KEY_DOWN = 'keyDown';
const KEY_UP = 'keyUp';
const WILL_APPEAR = 'willAppear';
const TITLE_PARAMETERS_DID_CHANGE = 'titleParametersDidChange';
const DEVICE_DID_CONNECT = 'deviceDidConnect';
const DEVICE_DID_DISCONNECT = 'deviceDidDisconnect';
const APPLICATION_DID_LAUNCH = 'applicationDidLaunch';
const APPLICATION_DID_TERMINATE = 'applicationDidTerminate';
const SYSTEM_DID_WAKE_UP = 'systemDidWakeUp';
const PROPERTY_INSPECTOR_DID_APPEAR = 'propertyInspectorDidAppear';
const PROPERTY_INSPECTOR_DID_DISAPPEAR = 'propertyInspectorDidDisappear';
const SEND_TO_PLUGIN = 'sendToPlugin';
const SEND_TO_PROPERTY_INSPECTOR = 'sendToPropertyInspector';
const CONNECTED = 'connected';
const SET_IMAGE = 'setImage';
const SET_TITLE = 'setTitle';
const SET_STATE = 'setState';
const SHOW_OK = 'showOk';
const SHOW_ALERT = 'showAlert';
const OPEN_URL = 'openUrl';
const SET_GLOBAL_SETTINGS = 'setGlobalSettings';
const GET_GLOBAL_SETTINGS = 'getGlobalSettings';
const SET_SETTINGS = 'setSettings';
const GET_SETTINGS = 'getSettings';
const REGISTER_PROPERTY_INSPECTOR = 'registerPropertyInspector';
const REGISTER_PLUGIN = 'registerPlugin';
const DATA_LOCALIZE = '[data-localize]';
const LOG_MESSAGE = 'logMessage';

/**
 * Destination
 */
const HARDWARE_AND_SOFTWARE = 0;
const HARDWARE_ONLY = 1;
const SOFTWARE_ONLY = 2;
