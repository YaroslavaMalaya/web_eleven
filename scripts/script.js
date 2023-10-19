$(document).ready(function () {
    
    let people = [
        { id:1, name: 'Yarina', age: 18,  date: dayjs('2005-05-08') },
        { id:2, name: 'Alice', age: 3,  date: dayjs('2020-10-05') },
        { id:3, name: 'Bob', age: 12, date: dayjs('2010-11-19') },
        { id:4, name: 'Charlie', age: 15, date: dayjs('2008-12-19') },
        { id:5, name: 'Oslar', age: 23, date: dayjs('2000-02-08') },
        { id:6, name: 'Andrew', age: 25, date: dayjs('1998-01-02') },
    ];

    const displayData = (highlightId = null) => {
        const formattedData = _.map(people, person => {
            const highlightClass = person.id === highlightId ? 'highlighted' : '';
            return `<div class="${highlightClass}">Name: ${person.name} <br> Age: ${person.age}<br> Date of birth: ${person.date.format('YYYY-MM-DD')}</div><br>`;
        }).join('');
        $("#output").html(formattedData);
    };
    
    displayData();
    
    $('#btnShuffle').click(function () {
        people = _.shuffle(people);
        displayData();
    });

    $('#btnSortByName').click(function () {
        people = _.sortBy(people, ['name']);
        displayData();
    });

    $('#btnSortByAge').click(function () {
        people = _.sortBy(people, ['age']);
        displayData();
    });

    $('#btnYoungest').click(function () {
        const youngest = _.minBy(people, 'age');
        displayData(youngest.id);
    });

    $('#btnOldest').click(function () {
        const oldest = _.maxBy(people, 'age');
        displayData(oldest.id);
    });

    $('#btnNextBirthdays').click(function () {
        const today = dayjs();
        people = _.sortBy(people, person => {
            const nextBirthday = person.date.set('year', today.year());
            if (today.isAfter(nextBirthday)) {
                // If the birthday this year has passed, consider the birthday of next year
                return nextBirthday.add(1, 'year');
            }
            return nextBirthday;
        });
        displayData();
    });

    $('#btnRemoveYoungest').click(function () {
        const youngest = _.minBy(people, 'age');
        _.remove(people, person => person.id === youngest.id);
        displayData();
    });

    $('#btnRemoveOldest').click(function () {
        const oldest = _.maxBy(people, 'age');
        _.remove(people, person => person.id === oldest.id);
        displayData();
    });

    $('#btnAverageAge').click(function () {
        const totalAge = _.sumBy(people, 'age');
        const averageAge = totalAge / people.length;
        alert(`The average age is: ${averageAge.toFixed(1)}`);
    });

    $('#btnNameLength').click(function () {
        const personWithLongestName = _.maxBy(people, person => person.name.length);
        displayData(personWithLongestName.id);
    });

});