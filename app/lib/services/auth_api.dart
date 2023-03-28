import 'dart:convert';

import 'package:app/constant.dart';
import 'package:app/models/response_model.dart';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;

class AuthAPI {
  Future<void> signUp(String username, String password) async {
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
    }
  }

  Future<void> signIn(String username, String password) async {
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
    }
  }
}
