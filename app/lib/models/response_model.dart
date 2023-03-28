class ResponseModel {
  final bool success;
  final dynamic data;

  ResponseModel({
    required this.success,
    required this.data,
  });

  factory ResponseModel.fromJson(Map<String, dynamic> json) {
    return ResponseModel(
      success: json['success'],
      data: json['data'],
    );
  }
}
