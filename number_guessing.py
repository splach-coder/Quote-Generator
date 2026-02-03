import random 
import time 

def validate_input(value, min_num, max_num):
    if not value.isdigit():
        raise ValueError("Input must be a number.")
    value = int(value)
    if value < min_num or value > max_num:
        raise ValueError(f"Input must be between {min_num} and {max_num}.")
    return value


def validate_guess(guessed_number, min_num, max_num):
    if guessed_number < min_num or guessed_number > max_num:
        raise ValueError("Your guess is out of the specified range.")

def check_guess(number_to_guess):
    global attempts
    while True:
        guessed_number = input(f"Guess a number between {min_num} and {max_num}: ")
        try:
            guessed_number = validate_input(guessed_number, min_num, max_num)
            validate_guess(guessed_number, min_num, max_num)
            attempts += 1
            break
        except ValueError as ve:
            print(ve)
    

    while attempts < 5:
        
        if guessed_number == number_to_guess:
            print(f"Congratulations! You've guessed the correct number! Attempts taken: {attempts + 1}")
            break
        elif guessed_number < number_to_guess and attempts < 5:
            attempts += 1
            print("Your guess is too low.")
            print(f"Attempts left: {5 - attempts + 1}")
            guessed_number = int(input("Try again: "))
        elif guessed_number > number_to_guess and attempts < 5:
            attempts += 1
            print("Your guess is too high.")
            print(f"Attempts left: {5 - attempts + 1}")
            guessed_number = int(input("Try again: "))
    else:
        if attempts == 5 and guessed_number != number_to_guess:
            print(f"Sorry, you've used all your attempts. The correct number was: {number_to_guess}. Better luck next time!")  
        else: 
            print(f"The correct number was: {number_to_guess}. Thanks for playing!")




print("Welcome to the Number Guessing Game! You have to guess the number chosen by the computer. You have only 5 attempts to guess it correctly.")
time.sleep(2)
print("You have to set the range for the number to be guessed.") 
time.sleep(2)
min_num = int(input("Enter the minimum number: "))
max_num = int(input("Enter the maximum number: "))
print("the number will be chosen...")
number_to_guess = random.randint(min_num, max_num) 
time.sleep(2)
5  
attempts = 0
check_guess(number_to_guess)
