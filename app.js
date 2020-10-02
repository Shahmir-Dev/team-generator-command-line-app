const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// empty array that can store the team members in
const teamArray = [];

// teams members questions:


// Manager: 

const managerQuestions = [
    {
        type: 'input',
        name: 'managerName',
        message: 'what your managers name? '
    },

    {
        type: 'input',
        name: 'managerID',
        message: 'What is this managers ID number?'
    },

    {
        type: 'input',
        name: 'managerEmail',
        message: 'What is this managers Email address?'
    },

    {
        type: 'input',
        name: 'office',
        message: 'What is this managers office number?'
    }
]
//Engineer: 
const engineerQuestions = [

    {
        type: 'input',
        name: 'engiName',
        message: 'Enter the name of this engineer'
    },

    {
        type: 'input',
        name: 'engiID',
        message: 'Enter the ID number for this engineer'
    },

    {
        type: 'input',
        name: 'engiEmail',
        message: 'Enter the email adress for this engineer'
    },

    {
        type: 'input',
        name: 'github',
        message: 'Enter this engineers GitHub user name'
    }
]

//Intern:
const internQuestions = [

    {
        type: 'input',
        name: 'internName',
        message: 'Enter the name of this intern'
    },

    {
        type: 'input',
        name: 'internID',
        message: 'Enter the ID number for this intern'
    },

    {
        type: 'input',
        name: 'internEmail',
        message: 'Enter the email address for this intern'
    },

    {
        type: 'input',
        name: 'school',
        message: 'What school does this intern attend? '
    }
]

//question to promt user if they want to add another employee

const addEmployee = [
    {
        type: 'list',
        name: 'nextEmployee',
        message: 'Select the type of team member you would like to add next',
        choices: ['Engineer', 'Intern', 'Done']
    }
]

// questions end

//starting function - begins with manager because each team will always have a manager 
function init() {
    //starts with the manager function
    managerPromt();
}

//function that will promt the user to select the next type of employee they are adding 
function next() {
    inquirer.prompt(addEmployee).then((response) => {

        console.log(response);
        switch (response.nextEmployee) {
            case 'Engineer':
                engineerPromt();
                break;
            case 'Intern':
                internPromt();
                break;
            case 'Done':
                console.log('Creating your team!')
                makeTeam();
        }
    })
}

//function for the manager questions that will be called first when initiated
function managerPromt() {
    inquirer.prompt(managerQuestions).then((response) => {

        let name = response.managerName;
        let id = response.managerID;
        let email = response.managerEmail;
        let office = response.office;
        // creats an object for this manager 
        const manager = new Manager(name, id, email, office);
        //pushes the new manager object to the empty array to be used later 
        teamArray.push(manager);
        //this will call the next function which will promt the user to select the next type of employee they are adding 
        console.log(teamArray);

        next();
    })
}

//Function for Engineer promts
function engineerPromt() {
    inquirer.prompt(engineerQuestions).then((response) => {

        let name = response.engiName;
        let id = response.engiID;
        let email = response.engiEmail;
        let github = response.github;
        // creats an object for this manager 
        const engineer = new Engineer(name, id, email, github);

        teamArray.push(engineer);
        console.log(teamArray);
        //this will call the next function which will promt the user to select the next type of employee they are adding 
        next();
    })
}

// Function for Intern promts
function internPromt() {
    inquirer.prompt(internQuestions).then((response) => {

        const intern = new Intern(name, id, email, school);

        teamArray.push(intern);
        console.log(teamArray);

        //this will call the next function which will promt the user to select the next type of employee they are adding 
        next();
    })
}

//function to make the file 
function makeTeam() {
    fs.writeFile(outputPath, render(teamArray), function (err) {
        if (err) {
            return console.log(err)
        }
    })

}

//calls the initiating function 
init();
