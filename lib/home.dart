import 'package:flutter/material.dart';

export "home.dart" show Home;

class Home extends StatelessWidget {
  const Home({Key? key}) : super(key: key);

  static const TextStyle optionStyle =
      TextStyle(fontSize: 30, fontWeight: FontWeight.bold);

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: Text('Home', style: optionStyle),
      ),
    );
  }
}
