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
    },
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
    },
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
    },
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
