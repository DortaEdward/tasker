#include <_stdio.h>
#include <fstream>
#include <ios>
#include <iostream>
#include <string>

const std::string FILEPATH = "./list.tsks";

std::string ConvertToBoolString(bool b) {
  if (b == 0) {
    return "false";
  }
  return "true";
}

class Task {
public:
  Task(std::string c) : content(c), complete(false) {};
  Task(std::string content, bool completed)
      : content(content), complete(completed) {};
  void setComplete() { complete = true; }
  void editContent(std::string c) { content = c; }
  std::string getContent() { return content; }
  bool getIsComplete() { return complete; }
  void setContent(std::string c) { content = c; }
  void setIsComplete(bool c) { complete = c; }

private:
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
  void listTasks(char t) {
    if (t == 'd') {
      for (int i = 0; i < tasks.size(); ++i) {
        std::cout << i << " | " << tasks[i].getContent() << " | "
                  << ConvertToBoolString(tasks[i].getIsComplete()) << std::endl;
      }
    } else if (t == 'n') {
      for (int i = 0; i < tasks.size(); ++i) {
        if (tasks[i].getIsComplete() == false) {
          std::cout << i << " | " << tasks[i].getContent() << " | "
                    << ConvertToBoolString(tasks[i].getIsComplete())
                    << std::endl;
        }
      }
    } else if (t == 'c') {
      for (int i = 0; i < tasks.size(); ++i) {
        if (tasks[i].getIsComplete() == true) {
          std::cout << i << " | " << tasks[i].getContent() << " | "
                    << ConvertToBoolString(tasks[i].getIsComplete())
                    << std::endl;
        }
      }
    }
  }
  void complete(int idx) {

    if (idx > tasks.size()) {
      std::cout << "ERROR: Index out of scope, try again" << std::endl;
      return;
    }

    for (int i = 0; i < tasks.size(); ++i) {
      if (i == idx) {
        tasks[i].setComplete();
        std::cout << "Task Marked As Complete" << std::endl;
      }
    }
  }

  void removeFromList(int idx) {
    for (int i = 0; i < tasks.size(); ++i) {
      if (i == idx) {
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
      "-remove: Remove Task via idx",
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
  if (s == "0") {
    b = false;
  } else {
    b = true;
  }
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
  std::vector<std::string> content;
  std::vector<bool> completed;

  while (getline(f, line, '\n')) {
    std::vector<std::string> temp = strip(line);
    content.push_back(temp[0]);
    completed.push_back(toBool(temp[1]));
    counter++;
  }

  f.close();

  for (int x = 0; x < counter; ++x) {
    Task task = {content[x], completed[x]};
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
    f << tasks[i].getContent() << '\t' << tasks[i].getIsComplete() << '\n';
  }
  f.close();
}

void printArgs(int argc, char *args[]) {
  for (int i = 0; i < argc; ++i) {
    std::cout << args[i] << std::endl;
  }
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
    tl.listTasks('d');
  }
  if (cmd == "-ln") {
    tl.listTasks('n');
  }
  if (cmd == "-ld") {
    tl.listTasks('c');
  }

  if (cmd == "-r") {
    tl.removeFromList(std::stoi(argv[2]));
    saveToFile(tl);
  }

  if (cmd == "-a") {
    std::string c = MakeToString(argv, argc);
    Task newTask = Task(c);
    tl.addToList(newTask);
    saveToFile(tl);
  }

  if (cmd == "-e") {
    tl.clear();
  }

  if (cmd == "-c") {
    tl.complete(std::stoi(argv[2]));
    saveToFile(tl);
  }

  return 0;
}
