import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report


def main():
    # 1) Load cleaned data exported from the notebook
    train = pd.read_csv("C:\\Users\\PC\\Desktop\\projects\\Quote-Generator\\python\\Twitter-Sentimental-Analysis\\data\\train_clean.csv")
    val   = pd.read_csv("C:\\Users\\PC\\Desktop\\projects\\Quote-Generator\\python\\Twitter-Sentimental-Analysis\\data\\val_clean.csv")

    # Safety: ensure types
    train["text"] = train["text"].astype(str)
    val["text"]   = val["text"].astype(str)

    # 2) Baseline model: TF-IDF + Logistic Regression
    model = Pipeline([
        ("tfidf", TfidfVectorizer(stop_words="english", ngram_range=(1, 2))),
        ("clf", LogisticRegression(max_iter=2000))
    ])

    model.fit(train["text"], train["sentiment"])
    preds = model.predict(val["text"])

    # 3) Metrics (Top-1 accuracy + detailed report)
    acc = accuracy_score(val["sentiment"], preds)
    print("Top-1 Accuracy:", acc)
    print(classification_report(val["sentiment"], preds))


if __name__ == "__main__":
    main()










