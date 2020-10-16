const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
const team = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
employeeInformation = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What type of employee?",
            name: "name",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
                "Team Completed"
            ]
        },
    ]).then(response => {
        if (response.name === "Manager") {
            managerInformation();
        } else if (response.name === "Engineer") {
            engineerInformation();
        } else if (response.name === "Intern") {
            internInformation();
        } else if (response.name === "Team Completed") {
            generateHTML(outputPath, render(team));
        };
    });
};

managerInformation = () => {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is your manager's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is your manager's ID?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your manager's email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is your manager's office number?",
            name: "number"
        },
    ]).then(function (answer) {
        let manager = new Manager(answer.name, answer.id, answer.email, answer.number);
        team.push(manager);
        console.log(`Manager is : ${manager.name}`);
        employeeInformation();
    })
};

engineerInformation = () => {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is your engineer's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is your engineer's ID?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your engineer's email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is your engineer's Github username?",
            name: "github"
        }
    ]).then(function (answer) {
        let engineer = new Engineer(answer.name, answer.id, answer.email, answer.github)
        team.push(engineer);

        employeeInformation()
    })
};

internInformation = () => {
    return inquirer.prompt([
        {
            type: "input",
            message: "what is your intern's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is your intern's ID",
            name: "id",
        },
        {
            type: "input",
            message: "What is your intern's email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is your intern's school",
            name: "school",
        },
    ]).then(function (answer) {
        let intern = new Intern(answer.name, answer.id, answer.email, answer.school)
        team.push(intern);

        employeeInformation()
    })
};

//file generateHTML(outputPath, render(team));
generateHTML = (fileName, data) => {
    fs.writeFile(fileName, data, "utf8", function (err) {
        if (err) {
            throw err;
        }
        console.log("Team Complete");
    });
};

employeeInformation();