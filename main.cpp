#include <_stdio.h>
#include <fstream>
#include <ios>
#include <iostream>
#include <random>
#include <sstream>
#include <string>

const std::string FILEPATH = "./list.tsks";
const std::string chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
const int CHARSRANGE = 61;

std::random_device rd;
std::mt19937 gen(rd());
std::uniform_int_distribution<> dist(0, CHARSRANGE);

std::string ConvertToBoolString(bool b) {
  if (b == 0) {
    return "false";
  }
  return "true";
}

std::string GenerateId() {
  std::string id = "";
  for (int i = 0; i < 4; ++i) {
    int rando = dist(gen);
    id += chars[rando];
  }
  return id;
}

class Task {
public:
  Task(std::string c) : content(c), complete(false), id(GenerateId()) {};
  Task(std::string id, std::string content, bool completed)
      : id(id), content(content), complete(completed) {};
  void setComplete() { complete = true; }
  void editContent(std::string c) { content = c; }
  std::string getContent() { return content; }
  bool getIsComplete() { return complete; }
  std::string getId() { return id; }
  void setContent(std::string c) { content = c; }
  void setIsComplete(bool c) { complete = c; }

private:
  std::string id;
  std::string content;
  bool complete;
};

class TaskList {
public:
  TaskList(std::vector<Task> t) : tasks(t) {}
  TaskList() {}
  int getCount() { return tasks.size(); }
  std::vector<Task> getTasks() { return tasks; };
  void addToList(const Task &t) { tasks.push_back(t); }
  void clear() {

    std::ofstream f;
    f.open(FILEPATH, std::ios::out);
    if (f.fail()) {
      std::cerr << "ERROR: Unable to open file\n";
    }
    f << "";
    f.close();
  }
  void listTasks() {
    for (int i = 0; i < tasks.size(); ++i) {
      std::cout << tasks[i].getId() << " | " << tasks[i].getContent() << " | "
                << ConvertToBoolString(tasks[i].getIsComplete()) << std::endl;
    }
  }
  void removeFromList(std::string id) {
    for (int i = 0; i < tasks.size(); ++i) {
      if (tasks[i].getId() == id) {
        tasks.erase(tasks.begin() + i);
      }
    }
  }

private:
  std::vector<Task> tasks;
};

void MissingArgumentsMessage() {
  std::cout << "ERROR: Missing Arguments" << std::endl;
  std::cout << "-help for commands list" << std::endl;
}

void HelpMessage() {
  int arrLen = 6;
  std::string commandList[] = {
      "----- Help Commands -----",
      "-l: List Tasks",
      "-c: Clear",
      "-add: Add Task",
      "-remove: Remove Task",
      "-complete: Complete Task",
  };
  for (int i = 0; i < arrLen; ++i) {
    std::cout << commandList[i] << std::endl;
  }
}

std::string MakeToString(char *args[], int len) {
  std::string c = "";
  for (int i = 2; i < len; i++) {
    c += std::string(args[i]);
    if (i != len - 1) {
      c += " ";
    }
  }
  return c;
}

bool toBool(const std::string s) {
  bool b;
  std::istringstream(s) >> std::boolalpha >> b;
  return b;
}

std::vector<std::string> strip(const std::string &s) {
  std::vector<std::string> stripedString;
  std::string temp;

  for (int i = 0; i < s.size(); ++i) {
    if (s[i] == '\t') {
      stripedString.push_back(temp);
      temp = "";
    } else {
      temp += s[i];
    }
  }
  stripedString.push_back(temp);
  return stripedString;
}

void loadFromFile(TaskList &taskL) {
  std::fstream f(FILEPATH, std::ios::in);
  if (f.fail()) {
    std::cerr << "ERROR: Unable to read file\n";
  }

  int counter = 0;
  std::string line;
  std::vector<std::string> ids;
  std::vector<std::string> content;
  std::vector<bool> completed;

  while (getline(f, line, '\n')) {
    std::vector<std::string> temp = strip(line);
    ids.push_back(temp[0]);
    content.push_back(temp[1]);
    completed.push_back(toBool(temp[2]));
    counter++;
  }

  for (int i = 0; i < ids.size(); ++i) {
    std::cout << ids[i] << " | " << content[i] << " | " << completed[i] << "\n";
  }
  f.close();

  for (int x = 0; x < counter; ++x) {
    Task task = {ids[x], content[x], completed[x]};
    taskL.addToList(task);
  }
}

void saveToFile(TaskList &ts) {
  std::ofstream f;
  f.open(FILEPATH, std::ios::out);

  if (f.fail()) {
    std::cout << "ERROR: Unable to open file\n";
    return;
  }

  std::vector<Task> tasks = ts.getTasks();
  for (int i = 0; i < ts.getCount(); ++i) {
    f << tasks[i].getId() << '\t' << tasks[i].getContent() << '\t'
      << tasks[i].getIsComplete() << '\n';
  }
  f.close();
}

int main(int argc, char *argv[]) {
  if (argc < 2) {
    MissingArgumentsMessage();
    return -1;
  }

  std::string cmd = std::string(argv[1]);
  TaskList tl = TaskList();

  loadFromFile(tl);
  if (cmd == "-h") {
    HelpMessage();
  }
  if (cmd == "-l") {
    tl.listTasks();
  }

  if (cmd == "-r") {
    std::cout << argv[2] << std::endl;
    tl.removeFromList(argv[2]);
    saveToFile(tl);
  }

  if (cmd == "-a") {
    std::string c = MakeToString(argv, argc);
    Task newTask = Task(c);
    tl.addToList(newTask);
    saveToFile(tl);
    return 0;
  }

  if (cmd == "-c") {
    tl.clear();
  }

  /*
        "-c: Clear",
        "-add: Add Task",
        "-remove: Remove Task",
        "-complete: Complete Task",
  */

  return 0;
}
