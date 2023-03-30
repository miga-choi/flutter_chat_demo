import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class StorageService {
  AndroidOptions _getAndroidOptions() => const AndroidOptions(encryptedSharedPreferences: true);

  final _storage = const FlutterSecureStorage();

  Future<String?> readStorage(String key_) async {
    return _storage.read(
      key: key_,
      aOptions: _getAndroidOptions(),
    );
  }

  Future<void> writeStorage(String key_, String value_) async {
    await _storage.write(
      key: key_,
      value: value_,
      aOptions: _getAndroidOptions(),
    );
  }

  Future<void> deleteStorage(String key_) async {
    await _storage.delete(
      key: key_,
      aOptions: _getAndroidOptions(),
    );
  }
}
