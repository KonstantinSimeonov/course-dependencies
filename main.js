$(() => {
    'use strict';

    // syntax: COURSE depends on COURSE[', ' or ' and ']COURSE...
    const rules = [
        // C# Module 1
        'C# Fundamentals depends on nothing',
        'C# Advanced depends on nothing',
        'C# OOP depends on nothing',
        'HTML depends on nothing',
        'CSS depends on nothing',
        'JS Fundamentals depends on nothing',

        'HQC 1 depends on C# Unit Testing',
        'HQC 2 depends on HQC 1',
        'Design Patterns depends on HQC 2',
        'Databases depends on Design Patterns', // ??????
        'DSA depends on Design Patterns',
        // JS Module 2
        'JS OOP depends on JS UI & DOM',
        'JS Apps depends on JS OOP',
        'Node.js depends on JS Apps',
        'UX Design depends on JS Apps',
        'Django depends on Databases, Node.js and Angular2',
        'Slice & Dice depends on Angular2 and UX Design',
        'Spring depends on Databases, Node.js and Angular2',
        'ASP.NET MVC depends on Databases, Node.js and Angular2',
        'ASP.NET Webforms depends on Databases, Node.js and Angular2',
        'iOS depends on Databases, Node.js and Angular2',
        'Android depends on Databases, Node.js and Angular2',
        'NativeScript depends on Databases, Node.js and Angular2',
        'Windows Universal depends on Databases, Node.js and Angular2'
    ];

    // options: track(different highlight color), span(different height), level(visualized on a different level)
    const coursesOptions = {
        'nothing': { track: 'no', level: -1 }, // don't write code like this
        'HTML': { track: 'javascript', level: 0 },
        'C# Fundamentals': { track: 'csharp', level: 0 },
        'CSS': { track: 'javascript', level: 1 },
        'C# Advanced': { track: 'csharp', level: 1 },
        'JS Fundamentals': { track: 'javascript', level: 2 },
        'C# OOP': { track: 'csharp', level: 2 },

        'C# Unit Testing': { track: 'csharp', level: 3 },
        'JS UI & DOM': { track: 'javascript', level: 3 },
        'JS OOP': { track: 'javascript', level: 4 },
        'HQC 1': { track: 'csharp', level: 4 },
        'JS Apps': { track: 'javascript', level: 5 },
        'HQC 2': { track: 'csharp', level: 5 },
        'Databases': { track: 'csharp', level: 6 },
        'Design Patterns': { track: 'csharp', level: 6 },

        'UX Design': { track: 'frontend', level: 7 },
        'Slice & Dice': { track: 'frontend', level: 9 },
        'DSA': { track: 'csharp', level: 7 }, // example of level
        'Node.js': { track: 'javascript', level: 7 },
        'Angular2': { track: 'web', level: 8 },
        'ASP.NET MVC': { track: 'web', level: 9 },
        'ASP.NET Webforms': { track: 'web', level: 10 },
        'Spring': { track: 'web', level: 11 },
        'Django': { track: 'web', level: 12 },
        'Windows Universal': { track: 'mobile', level: 9 },
        'Android': { track: 'mobile', level: 10 },
        'iOS': { track: 'mobile', level: 11 },
        'NativeScript': { track: 'mobile', level: 12 },
        // examples of spans
        'fast-track': { row: 3 },
    };

    const coursesData = topoSort(rules, coursesOptions), 
        $curriculumTable = buildCourseDependencyTable(coursesData, coursesOptions);

    $('#curriculum-container').append($curriculumTable);
});