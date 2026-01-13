import tkinter as tk
from tkinter import ttk
import math

class Calculator:
    def __init__(self, root):
        self.root = root
        self.root.title("Python Calculator")
        self.root.geometry("300x400")
        self.root.resizable(False, False)
        self.root.configure(bg="#f0f0f0")

        # Style configuration
        style = ttk.Style()
        style.configure("TButton", padding=5, font=('Segoe UI', 12))
        style.configure("TEntry", padding=5, font=('Segoe UI', 14))

        # Display
        self.display = ttk.Entry(root, justify="right", font=('Segoe UI', 20))
        self.display.grid(row=0, column=0, columnspan=4, padx=5, pady=5, sticky="nsew")

        # Buttons
        self.create_buttons()

        # Configure grid
        for i in range(5):
            self.root.grid_rowconfigure(i, weight=1)
        for i in range(4):
            self.root.grid_columnconfigure(i, weight=1)

    def create_buttons(self):
        # Button layout
        buttons = [
            ('C', 1, 0), ('±', 1, 1), ('%', 1, 2), ('÷', 1, 3),
            ('7', 2, 0), ('8', 2, 1), ('9', 2, 2), ('×', 2, 3),
            ('4', 3, 0), ('5', 3, 1), ('6', 3, 2), ('-', 3, 3),
            ('1', 4, 0), ('2', 4, 1), ('3', 4, 2), ('+', 4, 3),
            ('0', 5, 0, 2), ('.', 5, 2), ('=', 5, 3)
        ]

        for button in buttons:
            if len(button) == 4:  # For the '0' button that spans 2 columns
                btn = ttk.Button(self.root, text=button[0], command=lambda x=button[0]: self.click(x))
                btn.grid(row=button[1], column=button[2], columnspan=button[3], padx=2, pady=2, sticky="nsew")
            else:
                btn = ttk.Button(self.root, text=button[0], command=lambda x=button[0]: self.click(x))
                btn.grid(row=button[1], column=button[2], padx=2, pady=2, sticky="nsew")

    def click(self, key):
        if key == 'C':
            self.display.delete(0, tk.END)
        elif key == '=':
            try:
                expression = self.display.get()
                expression = expression.replace('×', '*').replace('÷', '/')
                result = eval(expression)
                self.display.delete(0, tk.END)
                self.display.insert(tk.END, str(result))
            except:
                self.display.delete(0, tk.END)
                self.display.insert(tk.END, "Error")
        elif key == '±':
            try:
                current = float(self.display.get())
                self.display.delete(0, tk.END)
                self.display.insert(tk.END, str(-current))
            except:
                pass
        elif key == '%':
            try:
                current = float(self.display.get())
                self.display.delete(0, tk.END)
                self.display.insert(tk.END, str(current/100))
            except:
                pass
        else:
            self.display.insert(tk.END, key)

if __name__ == "__main__":
    root = tk.Tk()
    calculator = Calculator(root)
    root.mainloop() 