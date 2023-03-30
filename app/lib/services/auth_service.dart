import 'dart:convert';

import 'package:app/constant.dart';
import 'package:app/models/response_model.dart';
import 'package:app/services/storage_service.dart';
import 'package:http/http.dart' as http;

class AuthService {
  StorageService _storageService = StorageService();

  Future<bool> signUp(String username, String password) async {
    final String body = jsonEncode({
      'username': username,
      'password': password,
    });
    final http.Response response = await http.post(
      Uri.parse('${Constant.baseUrl}/users/signup'),
      headers: Constant.httpHeader,
      body: body,
    );
    if (response.statusCode >= 200 && response.statusCode < 300) {
      final ResponseModel responseModel = ResponseModel.fromJson(jsonDecode(response.body));
      return responseModel.success;
    }
    return false;
  }

  Future<bool> signIn(String username, String password) async {
    final String body = jsonEncode({
      'username': username,
      'password': password,
    });
    final http.Response response = await http.post(
      Uri.parse('${Constant.baseUrl}/users/signin'),
      headers: Constant.httpHeader,
      body: body,
    );
    if (response.statusCode >= 200 && response.statusCode < 300) {
      final ResponseModel responseModel = ResponseModel.fromJson(jsonDecode(response.body));
      if (responseModel.success) {
        await _storageService.writeStorage(Constant.key, responseModel.data);
        return true;
      }
    }
    return false;
  }

  Future<void> signOut() async {
    await _storageService.deleteStorage(Constant.key);
  }
}
