"use strict";

//this calculates the price of a rental car by using functions with parameters

//get subtotal of rental with number of days and car types pulled in
function getRentalSubtotal(numberDays, carType)
{
    let rentalSubtotal = 0;

    switch (carType)
    {
        case "eco":
            rentalSubtotal = numberDays * 29.99;
            break;
        case "comp":
            rentalSubtotal = numberDays * 39.99;
            break;
        case "int":
            rentalSubtotal = numberDays * 49.99;
            break;
        case "full":
            rentalSubtotal = numberDays * 59.99
    }
    
    return rentalSubtotal;
}

//get total of options
function getOptionsCost(numberDays, tollTag, gps, roadside)
{
    let optionsSubtotal = 0;
    if (tollTag)
    {
        optionsSubtotal += 3.95 * numberDays;
    }

    if (gps)
    {
        optionsSubtotal += 2.95 * numberDays;
    }

    if (roadside)
    {
        optionsSubtotal += 2.95 * numberDays;
    }
    return optionsSubtotal;
}

//get drop off date for car
function getDropOffDate(pickupDate, numberDays)
{
    let returnDate;

    let inputPickupDate = new Date(pickupDate);

    let pickupDtMsec = 0;

    const msecPerDay = 1000 * 60 * 60 * 24;

    pickupDtMsec = inputPickupDate.getTime();

    pickupDtMsec += msecPerDay * (numberDays + 1);
    
    returnDate = new Date(pickupDtMsec);
    return returnDate;
}

window.onload = function()
{
    //defining variables
    let carTypeField = document.getElementById("carType");
    let pickupDateField = document.getElementById("pickupDate");
    let numberDaysField = document.getElementById("numberDays");
    let tollTagField = document.getElementById("tollTag");
    let gpsField = document.getElementById("gps");
    let roadsideField = document.getElementById("roadside");
    let subtotalField = document.getElementById("subtotal");
    let optionsCostField = document.getElementById("optionsCost");
    let u25chargeField = document.getElementById("u25charge");
    let finalTotalField = document.getElementById("finalTotal");
    let returnDateField = document.getElementById("returnDate")

    const btnCalculate = document.getElementById("estTotalCost");
    btnCalculate.onclick = function()
    {
        //rental subtotal with a switch to show a price which corresponds to a specific level of car 
        let rentalSubtotal = getRentalSubtotal(Number(numberDaysField.value), carTypeField.options[carTypeField.selectedIndex].value);
        
        //options subtotal with paremeters passed
        let optionsSubtotal = getOptionsCost(Number(numberDaysField.value), tollTagField.checked, gpsField.checked, roadsideField.checked);

        //under 25 field calculation
        let under25Field = document.querySelector("input[name=under25]:checked");

        let under25Price = 0;

        if (under25Field.value == "Yes")
        {
            under25Price = rentalSubtotal * .30;
        }

        //return date with parameters passed
        let rentalReturnDate = getDropOffDate(pickupDateField.value, Number(numberDaysField.value));

        //where values are going = the call from above
        subtotalField.value = rentalSubtotal.toFixed(2);
        optionsCostField.value = optionsSubtotal.toFixed(2);
        u25chargeField.value = under25Price.toFixed(2);
        finalTotalField.value = (rentalSubtotal + optionsSubtotal + under25Price).toFixed(2);
        returnDateField.value = rentalReturnDate.toLocaleDateString();
    }
}