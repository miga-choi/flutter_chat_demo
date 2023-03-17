import 'package:app/screens/sign_in_screen.dart';
import 'package:flutter/material.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  late IO.Socket socket;

  @override
  void initState() {
    super.initState();
    socket = IO.io(
      'http://192.168.142.234:8080',
      IO.OptionBuilder().setTransports(['websocket']).build(),
    );
    socket.onConnect((dynamic _) => print('onConnect'));
    socket.onDisconnect((dynamic _) => print('onDisconnect'));
    socket.on('fromServer', (dynamic data_) => print('from server data => $data_'));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: const Center(
        child: Text('This is Home Screen'),
      ),
      floatingActionButton: FloatingActionButton(
        child: const Icon(Icons.send),
        onPressed: () {
          print('socket.emit');
          socket.emit('msg', 'test');
        },
      ),
    );
  }
}
