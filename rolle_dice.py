import random as rd 
import time 
import numpy as np

def validate_input(value):
    if not value.lstrip("-").isdigit():
        raise ValueError("Input must be a number.")
    value = int(value)
    if value <= 0:
        raise ValueError("Input must be a positive integer.")

print("Welcome to dice roll game!")
time.sleep(2)
print("To make this a more personal game you gonna answer some questions. Ready?")
time.sleep(1)
print("if you type 'n' you will skip the questions and go straight to rolling the dice. with default values.")
choosing = True
while choosing:

    begin = input("(y/n) ").lower()
    if begin == "y" :
        
        side_num = int(input("How many sides you want in your dice?"))
        try:
            validate_input(str(side_num))
        except ValueError as ve:
            print(ve)
            continue
        time.sleep(1)
        dice_num = int(input("How many dice you want to roll? "))
        try:
            validate_input(str(dice_num))
        except ValueError as ve:
            print(ve)
            continue

        print(f"Great! You will roll {dice_num} dice with {side_num} sides each.")
        choosing = False
        time.sleep(2)
    elif begin == "n" :
        choosing = False
        side_num = 6
        dice_num = 2
        print(f"Great! You will roll {dice_num} dice with {side_num} sides each.")
        time.sleep(2)
    else :
        print("Invalid choice! ")
    
        

count = 0
list_sums = np.array([])
while True:
    choice = input("roll the dice?(y/n)").lower()
    
    if choice == "y" :
        count += 1
        list_dices = np.array([])
        
        print("Rolling the dice...")
        time.sleep(2)
        for i in range (dice_num) :
            dic = rd.randint(1,side_num)
            list_dices = np.append(list_dices, dic)
        print(f"You rolled: {list_dices}")
        print(f"Total sum: {np.sum(list_dices)}")
        list_sums = np.append(list_sums, np.sum(list_dices))
        time.sleep(1)

    elif choice == "n" :
        best_roll = np.max(list_sums) if list_sums.size > 0 else 0
        print(f"You rolled the dice {count} times.")
        time.sleep(1)
        print(f"Your best roll was : {best_roll}")
        time.sleep(1)
        print("Thank u for playing! ")
        break
    else :
        print("Invalid choice!")