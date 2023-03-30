class Constant {
  static const String baseUrl = 'http://192.168.35.117:8080/api';
  static const Map<String, String> httpHeader = {'Content-Type': 'application/json'};
  static const String key = 'a_token';
  static final RegExp usernameReg = RegExp(r'^[a-zA-Z\d]+$');
}
