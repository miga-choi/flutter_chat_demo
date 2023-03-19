import 'dart:convert';

import 'package:app/constant.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class SignInScreen extends StatefulWidget {
  const SignInScreen({Key? key}) : super(key: key);

  @override
  State<SignInScreen> createState() => _SignInScreenState();
}

class _SignInScreenState extends State<SignInScreen> {
  final TextEditingController _textEditingController = TextEditingController();
  String _usernameValidate = '';

  void onSignInPressed() async {
    final String text = _textEditingController.text;
    if (text.isEmpty) {
      _usernameValidate = 'Username required';
    } else {
      if (!Constant.usernameReg.hasMatch(text)) {
        _usernameValidate = 'Username should only contain a-z, A-Z, 0-9';
      }

      final String body = jsonEncode({'username': text});

      final http.Response response = await http.post(
        Uri.parse('${Constant.apiUrl}/users/signin'),
        headers: Constant.httpHeader,
        body: body,
      );
      print(response.body);
    }
    setState(() {});
  }

  @override
  void initState() {
    super.initState();
    _textEditingController.addListener(() {
      if (_usernameValidate.isNotEmpty && _textEditingController.text.isNotEmpty) {
        _usernameValidate = '';
        setState(() {});
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: const Text('Sign in'),
      ),
      body: Center(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const SizedBox(height: 200),
            const Text(
              'Hello, World',
              style: TextStyle(fontSize: 30, color: Colors.deepPurple),
            ),
            const SizedBox(height: 100),
            Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(
                  Icons.person,
                  size: 50,
                  color: Colors.blue,
                ),
                const SizedBox(width: 20),
                SizedBox(
                  width: 300,
                  child: TextField(
                    controller: _textEditingController,
                    decoration: InputDecoration(
                      hintText: 'Username',
                      enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(20),
                        borderSide: const BorderSide(
                          color: Colors.blue,
                        ),
                      ),
                      errorBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(20),
                        borderSide: const BorderSide(
                          color: Colors.red,
                        ),
                      ),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(20),
                        borderSide: const BorderSide(
                          color: Colors.orange,
                        ),
                      ),
                      errorText: _usernameValidate.isEmpty ? null : _usernameValidate,
                      focusedBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(20),
                        borderSide: const BorderSide(
                          color: Colors.blue,
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 50),
            SizedBox(
              width: 200,
              child: TextButton(
                onPressed: onSignInPressed,
                style: TextButton.styleFrom(backgroundColor: Colors.orange),
                child: const Text(
                  'Sign In',
                  style: TextStyle(color: Colors.white, fontSize: 16),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
