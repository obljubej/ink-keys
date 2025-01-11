#include "httplib.h"
#include <iostream>
#include <string>
#include <thread>
#include <atomic>

int main() {
    httplib::Server server;

    auto shared_string = std::make_shared<std::string>("");

    server.Get("/get-notes", [shared_string](const httplib::Request& req, httplib::Response& res) {
        std::string message = *shared_string;
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.set_header("Access-Control-Allow-Headers", "Content-Type");
        res.set_content(message, "text/plain");
    });

    std::thread server_thread([&server]() {
        std::cout << "Server is running on http://localhost:8080\n";
        server.listen("0.0.0.0", 8080);
    });

    while (true) {
        std::string new_string;
        std::cout << "Enter a new string: ";
        std::getline(std::cin, new_string);
        *shared_string = new_string;
        std::cout << "String updated!\n";
    }

    server_thread.join();

    return 0;
}
