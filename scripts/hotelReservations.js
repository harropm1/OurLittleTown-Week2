"use strict";

//this calculates the price of a hotel by using functions with parameters

/* This function sees if a hotel room can hold a given amount of people 
* @param rooms (array) - the array holding the room types, occupancies, and rates
* @param roomTypeInput (string) - the room type input from the user
* @param numberAdults (number)  - the number of adults chosen by the user
* @param numberKids (number) - the number of kids chosen by the user */

function canRoomHoldCustomer(rooms, roomTypeInput, numberAdults, numberKids)
{
    let occupants = numberAdults + numberKids;

    for (let i = 0; i < rooms.length; i++)
    {
        if (rooms[i].roomType == roomTypeInput && occupants <= rooms[i].occupancy)
        {
            return true;
        }      
    }
    return false;
}

/* This function gets the cost of the room 
* @param rooms (array) - the array holding the room types, occupancies, and rates
* @param roomTypeInput (string) - the room type input from the user
* @param numberNights (number)  - the number of nights chosen by the user
* @param checkinDate (number) - the check-in date chosen by the user, which is not being used right now*/
function getRoomCost(rooms, roomTypeInput, checkinDate, numberNights)
{
    let roomCost = 0;

    for (let i = 0; i < rooms.length; i++)
    {
        if (rooms[i].roomType == roomTypeInput)
        {
            roomCost = rooms[i].offSeasonPrice * numberNights;
            break;
        }
    }
    return roomCost;
}

/* This function gets the total of breakfast
* @param numberAdults (number)  - the number of adults chosen by the user
* @param numberKids (number) - the number of kids chosen by the user
* @param numberNights (number)  - the number of nights chosen by the user */
function getBreakfastCost(numberAdults, numberKids, numberNights)
{
    let breakfastCostInput = document.querySelector("input[name='breakfast']:checked").value;

    let breakfastCost = 0;

    if (breakfastCostInput == "yes")
    {
        breakfastCost += numberNights * ((6.96 * numberAdults) + (3.95 * numberKids));
    }
    return breakfastCost;
}

/* This function gets the discount on a room
* @param roomCostBeforeDiscount (number)  - the price of the room from other functions
* @param discount (string) - the discount amount selected on the website */
function getDiscount(roomCostBeforeDiscount, discount)
{
    discount = document.querySelector("input[name=discount]:checked").value;

    let totalDiscount = 0;

    if (discount == "military")
    {
        totalDiscount += roomCostBeforeDiscount * .20;
    }
    else if (discount == "none")
    {
        totalDiscount += 0;
    }
    else
    {
        totalDiscount += roomCostBeforeDiscount * .10;
    }

    return totalDiscount;
}

/* This function gets the checkout date
* @param checkinDate (date)  - the date chosen by the user
* @param numberNights (number)  - the number of nights chosen by the user */ 
function getCheckOutDate(checkinDate, numberNights)
{
    let checkOutDate;

    let inputcheckinDate = new Date(checkinDate);

    let checkinDtMsec = 0;

    const msecPerDay = 1000 * 60 * 60 * 24;

    checkinDtMsec = inputcheckinDate.getTime();

    checkinDtMsec += msecPerDay * (numberNights + 1);

    checkOutDate = new Date(checkinDtMsec);
    
    return checkOutDate;
}

//window on load
window.onload = function ()
{
    let rooms = [
        { roomType: "Queen", occupancy: "5", onSeasonPrice: 250.00, offSeasonPrice: 150.00},
        { roomType: "King", occupancy: "2", onSeasonPrice: 250.00, offSeasonPrice: 150.00},
        { roomType: "King Suite", occupancy: "4", onSeasonPrice: 310.00, offSeasonPrice: 190.00},
        { roomType: "2-Bedroom Suite", occupancy: "6", onSeasonPrice: 350.00, offSeasonPrice: 210.00}
    ]
    
    //defining variables
    let roomTypeField = document.getElementById("roomType");
    let checkinDateField = document.getElementById("checkinDate");
    let numberNightsField = document.getElementById("numberNights");
    let numberAdultsField = document.getElementById("numberAdults");
    let numberKidsField = document.getElementById("numberKids");

    //alert
    let noRoomAtInnField = document.getElementById("noRoomAtInn");
    let negativeNumbersField = document.getElementById("negativeNumbers");

    //display fields
    let finalCheckInField = document.getElementById("finalCheckIn");
    let finalCheckOutField = document.getElementById("finalCheckOut");
    let roomSubtotalField = document.getElementById("roomSubtotal");
    let discountField = document.getElementById("discount");
    let taxField = document.getElementById("tax");
    let finalTotalField = document.getElementById("finalTotal")

    checkinDateField.valueAsDate = new Date();

    //on button click
    const btnCalculate = document.getElementById("estRoomCost");
    btnCalculate.onclick = function ()
    {
        //alerts customer whether or not the room can hold their amount of guests (rooms is the array; roomTypeVariable, numberAdultsField, and numberKidsField are the external input)
        let roomTypeVariable = roomTypeField.options[roomTypeField.selectedIndex].text;
        let roomHoldCustomer = canRoomHoldCustomer(rooms, roomTypeVariable, Number(numberAdultsField.value), Number(numberKidsField.value));
        if (roomHoldCustomer == false)
        {
            let tooManyError = "You have too many people for that room. Please choose another room option or call us at 555-867-5309 to book more than one room.";
            noRoomAtInnField.innerHTML = tooManyError;
            return;
        }
        else {
            noRoomAtInnField.innerHTML = "";
        }

        //validating number of nights to be bigger than 0
        if (Number(numberNightsField.value) < 0)
        {
            let negNumbersError = "We don't need no stinking badges, but we do need positive numbers. Please try again.";
            negativeNumbersField.innerHTML = negNumbersError;
            return;
        }
        else
        {
            negativeNumbersField.innerHTML = "";
        }

        //Room cost subtotal with parameters passed (rooms is the array; roomTypeVariable, checkinDateField, and numberNightsField are the external input)
        let roomsSubtotal = getRoomCost(rooms, roomTypeVariable, checkinDateField.value, Number(numberNightsField.value));

        //breakfast cost with parameters passed
        let breakfastCost = getBreakfastCost(Number(numberAdultsField.value), Number(numberKidsField.value), Number(numberNightsField.value), discountField.checked);

        //making breakfast free for people with senior discounts
        if (document.getElementById("senior").checked)
        {
            breakfastCost = 0;
        }

        //discount amount with total room cost from below and dicsount field as parameters
        let discountAmount = getDiscount(roomsSubtotal, discountField.value);


        //calculation to create subtotal for room cost
        let totalRoomCost = breakfastCost + roomsSubtotal;

        //checkoutdate with parameters passed
        let checkinDate = checkinDateField.value;
        let correctDate = checkinDate.slice(5, 7) + "/" + checkinDate.slice(8, 10) + "/" + checkinDate.slice(0,4);
        let checkOutDate = getCheckOutDate(checkinDateField.value, Number(numberNightsField.value));

        //tax calculations
        let totalBeforeTax = totalRoomCost - discountAmount;
        let taxAmount = totalBeforeTax * .12;
    
        //calculate the final total
        let finalTotal = taxAmount + totalBeforeTax;

        //where values are going = the call from above
        finalCheckInField.value = correctDate;
        finalCheckOutField.value = checkOutDate.toLocaleDateString();
        roomSubtotalField.value = totalRoomCost.toFixed(2);
        discountField.value = discountAmount.toFixed(2);
        taxField.value = taxAmount.toFixed(2);
        finalTotalField.value = finalTotal.toFixed(2);
    }
}