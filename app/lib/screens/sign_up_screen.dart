import 'dart:convert';

import 'package:app/constant.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class SignUpScreen extends StatefulWidget {
  const SignUpScreen({Key? key}) : super(key: key);

  @override
  State<SignUpScreen> createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen> {
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  String _usernameValidate = '';
  String _passwordValidate = '';

  void onSignInPressed() async {
    final String username = _usernameController.text;
    final String password = _passwordController.text;
    if (username.isEmpty) {
      _usernameValidate = 'Username required';
      setState(() {});
      return;
    }
    if (!Constant.usernameReg.hasMatch(username)) {
      _usernameValidate = 'Username should only contain a-z, A-Z, 0-9';
      setState(() {});
      return;
    }

    if (password.isEmpty) {
      _passwordValidate = 'Password required';
      setState(() {});
      return;
    }

    final String body = jsonEncode({'username': username});

    final http.Response response = await http.post(
      Uri.parse('${Constant.baseUrl}/api/users/signin'),
      headers: Constant.httpHeader,
      body: body,
    );
    print(response);
  }

  @override
  void initState() {
    super.initState();
    _usernameController.addListener(() {
      if (_usernameValidate.isNotEmpty && _usernameController.text.isNotEmpty) {
        _usernameValidate = '';
        setState(() {});
      }
    });
    _passwordController.addListener(() {
      if (_passwordValidate.isNotEmpty && _passwordController.text.isNotEmpty) {
        _passwordValidate = '';
        setState(() {});
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: const Text('Sign up'),
      ),
      body: Center(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const SizedBox(height: 200),
            const Text(
              'Sign up',
              style: TextStyle(fontSize: 30, color: Colors.deepPurple),
            ),
            const SizedBox(height: 100),
            Column(
              children: [
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
                        controller: _usernameController,
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
                const SizedBox(height: 10),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(
                      Icons.password,
                      size: 50,
                      color: Colors.blue,
                    ),
                    const SizedBox(width: 20),
                    SizedBox(
                      width: 300,
                      child: TextField(
                        controller: _passwordController,
                        decoration: InputDecoration(
                          hintText: 'Password',
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
                          errorText: _passwordValidate.isEmpty ? null : _passwordValidate,
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
