import 'package:app/screens/home_screen.dart';
import 'package:app/screens/sign_in_screen.dart';
import 'package:flutter/material.dart';
import 'package:realm/realm.dart';

void main() {
  final appConfig = AppConfiguration('test-wyxwl');
  final app = App(appConfig);

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Chat Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: false ? const SignInScreen() : const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}
