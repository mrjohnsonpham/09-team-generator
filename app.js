const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");



const teamMembers = []

function generateTeamHtml() {

    return inquirer
        .prompt([

            {
                type: "list",
                name: "memberChoice",
                message: "Which type of team member are you?",
                choices: [
                    "Manager",
                    "Engineer",
                    "Intern",
                    "No more members to add"
                ]
            }

        ]).then(userChoice => {
            // pass in the variable
            switch (userChoice.memberChoice) {
                // in case userChoice
                case "Manager":
                    return addManager();
                    break;

                case "Engineer":
                    return addEngineer();
                    break;

                case "Intern":
                    return addIntern();
                    break;

                case "No more employees":
                    return;
                    break

            }
        })


    function addManager() {

        return inquirer
            .prompt([

                {
                    type: "input",
                    message: "What is your full name?",
                    name: "managerName"
                },

                {
                    type: "input",
                    message: "What is your employee ID?",
                    name: "managerID"
                },

                {
                    type: "input",
                    message: "What is your email?",
                    name: "managerEmail"
                },

                {
                    type: "input",
                    message: "What is your office number?",
                    name: "managerOfficeNum"
                }

            ]).then(userChoice => {
                console.log(userChoice);

                const manager = new Manager(userChoice.managerName, userChoice.managerID, userChoice.managerEmail, userChoice.managerOfficeNum)

                teamMembers.push(manager)

                return generateTeamHtml();

            })


    }


    function addEngineer() {
        return inquirer
            .prompt([

                {
                    type: "input",
                    message: "What is your full name?",
                    name: "engineerName"
                },

                {
                    type: "input",
                    message: "What is your employee ID?",
                    name: "engineerID"
                },

                {
                    type: "input",
                    message: "What is your email?",
                    name: "engineerEmail"
                },

                {
                    type: "input",
                    message: "What is your GitHub username?",
                    name: "gitHubUsername"
                }
            ]).then(userChoice => {
                console.log(userChoice);

                const engineer = new Engineer(userChoice.engineerName, userChoice.engineerID, userChoice.engineerEmail, userChoice.gitHubUsername)

                teamMembers.push(engineer)

                return generateTeamHtml();

            })
    }




    function addIntern() {

      return inquirer
            .prompt([

                {
                    type: "input",
                    message: "What is your full name?",
                    name: "internName"
                },

                {
                    type: "input",
                    message: "What is your employee ID?",
                    name: "internID"
                },

                {
                    type: "input",
                    message: "What is your email?",
                    name: "internEmail"
                },

                {
                    type: "input",
                    message: "What is your school?",
                    name: "internSchool"
                }
            ]).then(userChoice => {
                console.log(userChoice);

                const intern = new Intern(userChoice.internName, userChoice.internID, userChoice.internEmail, userChoice.internSchool)

                teamMembers.push(intern)

                return generateTeamHtml();
            })
    }
}

generateTeamHtml()
.then(() => {
  let html = render(teamMembers);
  fs.writeFile("team.html", html, 'utf8', () => {
    console.log("Finished")
  });
   
})
module.exports = teamMembers

