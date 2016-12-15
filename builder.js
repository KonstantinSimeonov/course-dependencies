function buildCourseDependencyTable(coursesData, coursesOptions) {
    'use strict';

    // WARNING: here be dragons
    const $curriculumTable = $('<table class="curriculum" />'),
        $thead = $('<thead />').appendTo($curriculumTable),
        $tr = $('<tr />').appendTo($thead),
        //$th = $('<th colspan="4" class="text-info" />').html('Click on a course or track to highlight its dependencies:').appendTo($tr),
        $tbody = $('<tbody />').appendTo($curriculumTable),
        $cells = [];

    const order = {
        'csharp': 0,
        'javascript': 1,
        'web': 3,
        'mobile': 4,
        'frontend': 5,
    };

    coursesData.topoSorted.sort((a, b) => {
        return order[coursesOptions[a].track] - order[coursesOptions[b].track];
    });

    for (let course of coursesData.topoSorted) {
        const courseLevel = coursesOptions[course].level;

        if (!$cells[courseLevel]) {
            $cells[courseLevel] = $('<tr class="curriculum-level" />');
        }

        const $courseCell = $(`<td class="course-name-td" />`),
            $courseNameBtn = $(`<a class="course-name btn btn-primary btn-${coursesOptions[course].track}" />`)
                .text(course)
                .appendTo($courseCell);

        // set rowspan and custom class for button height
        if (coursesOptions[course].span) {
            $courseCell.attr('rowspan', coursesOptions[course].span);
            $courseCell.find('a').addClass('btn-xlarge-' + $courseCell.attr('rowspan'));
        }

        $cells[courseLevel].append($courseCell);
    }

    if ('fast-track' in coursesOptions) {
        const $ftRow = $('<tr />'),
            $ftCell = $('<th class="text-info" colspan="4"/>')
                .text('Fast track: you can join the next two courses online!')
                .appendTo($ftRow);

        $cells.splice(coursesOptions['fast-track'].row, 0, $ftRow);
    }

    $curriculumTable.append(...$cells);

    $curriculumTable.on('click', (ev) => {

        if (ev.target.tagName.toLowerCase() !== 'a') {
            return;
        }

        const $courseNames = $('.course-name')

        // clear old colors
        $courseNames.each((_, e) => {
            $(e).removeClass('btn-primary').addClass('btn-default btn-grayout');
        });

        const courseName = ev.target.innerText,
            reverse = coursesData.reverse,
            nodes = [courseName],
            result = Object.create(null);

        // dfs from child to root, store results for later highlighting
        while (nodes.length) {
            const current = nodes.pop();

            result[current] = true;

            if (reverse[current])
                nodes.push(...reverse[current]);
        }

        // attach new highlights
        $courseNames.each((_, e) => {
            const $element = $(e),
                mustBeHighlighted = result[$element.text()];

            if (mustBeHighlighted) {
                $element.removeClass('btn-default').addClass(`btn-primary`);
            } else {
                $element.removeClass('btn-primary').addClass('btn-default');
            }
        });
    });

    $('#reset-btn').on('click', ev => {
        $('.course-name').each((_, element) => $(element).addClass('btn-primary').removeClass('btn-default btn-grayout'))
    });

    return $curriculumTable;
}