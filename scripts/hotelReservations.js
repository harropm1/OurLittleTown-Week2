"use strict";

//this calculates the price of a hotel by using functions with parameters

//get subtotal of rental with number of days and car types pulled in
function canRoomHoldCustomer(roomType, numberAdults, numberKids)
{
    let canRoomHoldCustomer;
    let occupants = numberAdults + numberKids;

    if (roomType.value = "queen" && occupants <= 5)
    {
        canRoomHoldCustomer = yes;

    }
    else if (roomType.value == "king" && occupants <= 2)
    {
        canRoomHoldCustomer = yes;
    }
    else if (roomType.value == "kingSuite" && occupants <= 4)
    {
        canRoomHoldCustomer = yes;
    }
    else if (roomType.value == "bedroomSuite" && occupants <= 6)
    {
        canRoomHoldCustomer = yes;
    }
    else
    {
        canRoomHoldCustomer = no;
        //display message above check-in/checkout dates that a single room is not available for that many people
    }
    return canRoomHoldCustomer;
}

//get subtotal of rental with number of days and car types pulled in
function getRoomCost(roomType, checkinDate, numberNights)
{
    let roomCost = 0;

    switch (roomType)
    {
        case "queen":
            roomCost = numberNights * 150.00;
            break;
        case "king":
            roomCost = numberNights * 150.00;
            break;
        case "kingSuite":
            roomCost = numberNights * 190.00;
            break;
        case "bedroomSuite":
            roomCost = numberNights * 210.00;
    }
    console.log(roomCost);
    return roomCost;
}

//get total of options
function getBreakfastCost(numberAdults, numberKids, numberNights, discount)
{
    let breakfastCost = document.querySelector("input[name=breakfast]:checked");

    breakfastCost = 0;

    if (breakfastCost.value == "Yes" && numberAdults > 0)
    {
        breakfastCost = numberNights * 6.96;
    }

    if (breakfastCost.value == "Yes" && numberKids > 0)
    {
        breakfastCost = numberNights * 3.95;
    }
    console.log(breakfastCost);
    return breakfastCost;
}

function getDiscount (roomCostBeforeDiscount, discount)
{
    discount = document.querySelector("input[name=discount]:checked");

    let totalDiscount = 0;

    switch (discount)
    {
        case "aaa":
            totalDiscount = roomCostBeforeDiscount * .10;
            break;
        case "senior":
            totalDiscount = roomCostBeforeDiscount * 10;
            breakfastCost = 0
            break;
        case "military":
            totalDiscount = roomCostBeforeDiscount * .20;
            break;
        default:
            totalDiscount = roomCostBeforeDiscount * 0;
    }
    console.log(totalDiscount);
    return totalDiscount;
}

//get drop off date for car
function getCheckOutDate(checkinDate, numberNights)
{
    let checkOutDate;

    let inputcheckinDate = new Date(checkinDate);

    let checkinDtMsec = 0;

    const msecPerDay = 1000 * 60 * 60 * 24;

    checkinDtMsec = inputcheckinDate.getTime();

    checkinDtMsec += msecPerDay * (numberNights + 1);

    checkOutDate = new Date(checkinDtMsec);
    console.log(checkOutDate);
    return checkOutDate;
}

window.onload = function ()
{
    //defining variables
    let roomTypeField = document.getElementById("roomType");
    let checkinDateField = document.getElementById("checkinDate");
    let numberNightsField = document.getElementById("numberNights");
    let numberAdultsField = document.getElementById("numberAdults");
    let numberKidsField = document.getElementById("numberKids");
    let finalCheckInField = document.getElementById("finalCheckIn");
    let finalCheckOutField = document.getElementById("finalCheckOut");
    let roomsSubtotalField = document.getElementById("roomsSubtotal");
    let discountField = document.getElementById("discount");
    let taxField = document.getElementById("tax");
    let finalTotalField = document.getElementById("finalTotal")

    let rooms = [
        {roomType: "Queen", occupancy: "5", onSeasonPrice: "250.00", offSeasonPrice: "150.00"},
        {roomType: "King", occupancy: "2", onSeasonPrice: "250.00", offSeasonPrice: "150.00"},
        {roomType: "King Suite", occupancy: "4", onSeasonPrice: "310.00", offSeasonPrice: "190.00"},
        {roomType: "2-Bedroom Suite", occupancy: "6", onSeasonPrice: "350.00", offSeasonPrice: "210.00"}
    ]

    const btnCalculate = document.getElementById("estRoomCost");
    btnCalculate.onclick = function ()
    {
        //alerts customer whether or not the room can hold their amount of guests
        let roomHoldCustomer = canRoomHoldCustomer(roomTypeField.value, Number(numberAdultsField.value), Number(numberKidsField.value));

        //Room cost subtotal with parameters passed
        let roomsSubtotal = getRoomCost(roomTypeField.value, checkinDateField.value, Number(numberNightsField.value));

        //breakfast cost with parameters passed
        let breakfastCost = getBreakfastCost(Number(numberAdultsField.value), Number(numberKidsField.value), Number(numberNightsField.value), discountField.checked);
        
        //discount amount with total room cost from below and dicsount field as parameters
        let discountAmount = getDiscount(totalRoomCost, discountField.value);

        //calculation to create subtotal for room cost
        let totalRoomCost = breakfastCost + roomsSubtotal;

        //checkoutdate with parameters passed
        let checkOutDate = getDropOffDate(checkinDateField.value, Number(numberNightsField.value));

        //tax calculations
        let totalBeforeTax = discountAmount + totalRoomCost;
        let taxAmount = totalBeforeTax * .12;

        let finalTotal = taxAmount + totalBeforeTax;

        //where values are going = the call from above
        finalCheckInField.value = checkinDateField.value;
        finalCheckOutField.value = checkOutDate.toLocaleDateString();
        roomsSubtotalField.value = totalRoomCost.toFixed(2);
        discountField.value = discountAmount.toFixed(2);
        taxField.value = taxAmount.toFixed(2);
        finalTotalField.value = finalTotal.toFixed(2);

    }
}