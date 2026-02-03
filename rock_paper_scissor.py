import random as rd 
import time 

ROCK = "r"
PAPER = "p"             
SCISSORS = "s"
def get_user_choice(options):
    user_choice = input("enter your choice (r for rock, p for paper, s for scissors): ").lower()
    if user_choice in options:
        return user_choice
    else:
        print("Invalid choice!")
        

def display_choice(user_choice, computer_choice, options):
    print(f"You chose: {options[user_choice]}")
    print(f"Computer chose: {options[computer_choice]}")

def get_winner(user_choice, computer_choice, user_score, computer_score):
    user_score, computer_score
    if user_choice == computer_choice:
        print("It's a tie!")
    elif ((user_choice == ROCK and computer_choice == SCISSORS) or 
        (user_choice == PAPER and computer_choice == ROCK) or 
        (user_choice == SCISSORS and computer_choice == PAPER)):
        user_score += 1
        print("You win this round!")
    else:
        computer_score += 1
        print("Computer wins this round!")
    print(f"Score -> You: {user_score}, Computer: {computer_score}")
    
    return user_score, computer_score

def play_game():
    
    print("Welcome to rock, paper, scissors game!")
    time.sleep(2)
    print("You will be playing against the computer. First to score 3 points wins the game.")
    time.sleep(2)   
    options_detail = {ROCK: "rock", PAPER: "paper", SCISSORS: "scissors"}
    options = tuple(options_detail.keys())
    user_score = 0
    computer_score = 0

    while user_score < 3 and computer_score < 3:
        user_choice = get_user_choice(options)
        computer_choice = rd.choice(list(options))
        display_choice(user_choice, computer_choice, options_detail)
        time.sleep(2)
        user_score, computer_score = get_winner(user_choice, computer_choice, user_score, computer_score)
        time.sleep(2)
        
    if user_score == 3:
        print("Congratulations! You won the game!")
    else:
        print("Computer won the game! Better luck next time!")


play_game()




