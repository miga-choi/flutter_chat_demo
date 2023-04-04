import 'package:app/models/response_model.dart';
import 'package:app/screens/sign_in_screen.dart';
import 'package:app/services/auth_service.dart';
import 'package:flutter/material.dart';
import 'package:realm/realm.dart';

class RoomScreen extends StatefulWidget {
  const RoomScreen({Key? key}) : super(key: key);

  @override
  State<RoomScreen> createState() => _RoomScreenState();
}

class _RoomScreenState extends State<RoomScreen> {
  final AuthService _authService = AuthService();

  List<String> rooms = <String>[];

  Future<ResponseModel> onSignOutPress() async {
    return _authService.signOut();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Room list'),
        actions: [
          IconButton(
            onPressed: () async {
              final ResponseModel result = await onSignOutPress();
              if (result.success && context.mounted) {
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const SignInScreen(),
                  ),
                );
              }
            },
            icon: const Icon(Icons.logout),
          )
        ],
      ),
      body: const Center(
        child: Text('Hello, World!'),
      ),
    );
  }
}
