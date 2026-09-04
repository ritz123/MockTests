#!/usr/bin/env python3
"""Append 100 verified questions to each non-quant question bank."""

from __future__ import annotations

import json
import sys
from pathlib import Path

BANK_DIR = Path(__file__).resolve().parent.parent / "public" / "tests" / "bank"

BANK_CONFIG = {
    "logical": {"file": "logical.json", "category": "logical"},
    "cs": {"file": "cs.json", "category": "cs"},
    "puzzles": {"file": "puzzles.json", "category": "puzzles"},
    "algorithms": {"file": "algorithms.json", "category": "algorithms"},
    "practical": {"file": "practical.json", "category": "practical"},
}

NEW_QUESTIONS: dict[str, list[dict]] = {
  "logical": [
    {
      "id": "logical-q21",
      "difficulty": "easy",
      "prompt": "Find the next number: 1, 4, 9, 16, 25, ?",
      "options": [
        "30",
        "36",
        "42",
        "49"
      ],
      "correctIndex": 1,
      "explanation": "Perfect squares: 6² = 36."
    },
    {
      "id": "logical-q22",
      "difficulty": "easy",
      "prompt": "Find the next number: 3, 6, 11, 18, 27, ?",
      "options": [
        "34",
        "36",
        "38",
        "40"
      ],
      "correctIndex": 2,
      "explanation": "Differences increase by 2: 27 + 11 = 38."
    },
    {
      "id": "logical-q23",
      "difficulty": "easy",
      "prompt": "Find the next number: 2, 3, 5, 8, 13, ?",
      "options": [
        "18",
        "19",
        "21",
        "24"
      ],
      "correctIndex": 2,
      "explanation": "Fibonacci: 8 + 13 = 21."
    },
    {
      "id": "logical-q24",
      "difficulty": "easy",
      "prompt": "Find the next number: 5, 10, 20, 40, ?",
      "options": [
        "60",
        "70",
        "80",
        "100"
      ],
      "correctIndex": 2,
      "explanation": "Each term doubles: 40 × 2 = 80."
    },
    {
      "id": "logical-q25",
      "difficulty": "easy",
      "prompt": "Find the next number: 100, 81, 64, 49, ?",
      "options": [
        "25",
        "36",
        "42",
        "45"
      ],
      "correctIndex": 1,
      "explanation": "Descending squares: next is 6² = 36."
    },
    {
      "id": "logical-q26",
      "difficulty": "easy",
      "prompt": "Find the next number: 1, 8, 27, 64, ?",
      "options": [
        "100",
        "125",
        "144",
        "216"
      ],
      "correctIndex": 1,
      "explanation": "Cubes: 5³ = 125."
    },
    {
      "id": "logical-q27",
      "difficulty": "easy",
      "prompt": "Find the next number: 3, 9, 27, 81, ?",
      "options": [
        "162",
        "243",
        "324",
        "729"
      ],
      "correctIndex": 1,
      "explanation": "Powers of 3: 3⁵ = 243."
    },
    {
      "id": "logical-q28",
      "difficulty": "easy",
      "prompt": "Find the next number: 4, 9, 19, 39, ?",
      "options": [
        "59",
        "69",
        "79",
        "89"
      ],
      "correctIndex": 2,
      "explanation": "Each term ×2 + 1: 39×2 + 1 = 79."
    },
    {
      "id": "logical-q29",
      "difficulty": "easy",
      "prompt": "Find the next number: 50, 45, 40, 35, ?",
      "options": [
        "25",
        "30",
        "32",
        "33"
      ],
      "correctIndex": 1,
      "explanation": "Subtract 5 each time: 35 − 5 = 30."
    },
    {
      "id": "logical-q30",
      "difficulty": "easy",
      "prompt": "Find the next number: 2, 4, 8, 16, 32, ?",
      "options": [
        "48",
        "56",
        "64",
        "128"
      ],
      "correctIndex": 2,
      "explanation": "Powers of 2: 2⁶ = 64."
    },
    {
      "id": "logical-q31",
      "difficulty": "easy",
      "prompt": "Find the next number: 1, 3, 6, 10, 15, ?",
      "options": [
        "18",
        "20",
        "21",
        "25"
      ],
      "correctIndex": 2,
      "explanation": "Triangular numbers: 15 + 6 = 21."
    },
    {
      "id": "logical-q32",
      "difficulty": "easy",
      "prompt": "Find the next number: 7, 14, 28, 56, ?",
      "options": [
        "84",
        "98",
        "112",
        "128"
      ],
      "correctIndex": 2,
      "explanation": "Each doubles: 56 × 2 = 112."
    },
    {
      "id": "logical-q33",
      "difficulty": "easy",
      "prompt": "Find the next number: 9, 18, 36, 72, ?",
      "options": [
        "108",
        "126",
        "144",
        "162"
      ],
      "correctIndex": 2,
      "explanation": "Each doubles: 72 × 2 = 144."
    },
    {
      "id": "logical-q34",
      "difficulty": "easy",
      "prompt": "Find the next number: 11, 22, 44, 88, ?",
      "options": [
        "132",
        "154",
        "176",
        "198"
      ],
      "correctIndex": 2,
      "explanation": "Each doubles: 88 × 2 = 176."
    },
    {
      "id": "logical-q35",
      "difficulty": "easy",
      "prompt": "Find the next number: 2, 6, 12, 20, 30, 42, ?",
      "options": [
        "50",
        "54",
        "56",
        "60"
      ],
      "correctIndex": 2,
      "explanation": "n(n+1): 7×8 = 56."
    },
    {
      "id": "logical-q36",
      "difficulty": "easy",
      "prompt": "Find the next number: 64, 32, 16, 8, ?",
      "options": [
        "2",
        "4",
        "6",
        "0"
      ],
      "correctIndex": 1,
      "explanation": "Each halved: 8 ÷ 2 = 4."
    },
    {
      "id": "logical-q37",
      "difficulty": "easy",
      "prompt": "Find the next number: 3, 5, 9, 17, 33, ?",
      "options": [
        "49",
        "57",
        "65",
        "67"
      ],
      "correctIndex": 2,
      "explanation": "Each ×2 − 1: 33×2 − 1 = 65."
    },
    {
      "id": "logical-q38",
      "difficulty": "easy",
      "prompt": "Find the next number: 2, 5, 10, 17, 26, ?",
      "options": [
        "35",
        "37",
        "39",
        "41"
      ],
      "correctIndex": 1,
      "explanation": "n² + 1: 6² + 1 = 37."
    },
    {
      "id": "logical-q39",
      "difficulty": "easy",
      "prompt": "Find the next number: 6, 11, 21, 36, 56, ?",
      "options": [
        "76",
        "81",
        "86",
        "91"
      ],
      "correctIndex": 1,
      "explanation": "Differences +5: 56 + 25 = 81."
    },
    {
      "id": "logical-q40",
      "difficulty": "easy",
      "prompt": "Find the next number: 0, 1, 1, 2, 3, 5, 8, 13, ?",
      "options": [
        "18",
        "20",
        "21",
        "24"
      ],
      "correctIndex": 2,
      "explanation": "Fibonacci: 8 + 13 = 21."
    },
    {
      "id": "logical-q41",
      "difficulty": "easy",
      "prompt": "If CAT is coded as 3120 (C=3, A=1, T=20), how is DOG coded?",
      "options": [
        "4157",
        "4715",
        "1574",
        "7415"
      ],
      "correctIndex": 0,
      "explanation": "D=4, O=15, G=7 → 4157."
    },
    {
      "id": "logical-q42",
      "difficulty": "easy",
      "prompt": "If FRIEND is coded as GSJFOE (+1 each letter), how is SCHOOL coded?",
      "options": [
        "TDIPPM",
        "TDIPOM",
        "TDIPOL",
        "TDJPOM"
      ],
      "correctIndex": 0,
      "explanation": "S→T, C→D, H→I, O→P, O→P, L→M → TDIPPM."
    },
    {
      "id": "logical-q43",
      "difficulty": "easy",
      "prompt": "If RED is written as UHG (+3 shift), how is BLUE written?",
      "options": [
        "EOXH",
        "EYPH",
        "EOXG",
        "FOXH"
      ],
      "correctIndex": 0,
      "explanation": "B→E, L→O, U→X, E→H → EOXH."
    },
    {
      "id": "logical-q44",
      "difficulty": "easy",
      "prompt": "If CLOUD is coded as DMPVE, how is STORM coded?",
      "options": [
        "TUPSN",
        "TUPSO",
        "TVPSN",
        "TUSPN"
      ],
      "correctIndex": 0,
      "explanation": "Each letter +1 → TUPSN."
    },
    {
      "id": "logical-q45",
      "difficulty": "easy",
      "prompt": "If PENCIL is written as QFODJM, how is ERASER written?",
      "options": [
        "FSBTFS",
        "FSBSES",
        "FRBTFS",
        "FSATFS"
      ],
      "correctIndex": 0,
      "explanation": "Each letter +1 → FSBTFS."
    },
    {
      "id": "logical-q46",
      "difficulty": "easy",
      "prompt": "If WATER is written as YCVGT (+2), how is FIRE written?",
      "options": [
        "HKTG",
        "HKTF",
        "GKTG",
        "HITG"
      ],
      "correctIndex": 0,
      "explanation": "F→H, I→K, R→T, E→G → HKTG."
    },
    {
      "id": "logical-q47",
      "difficulty": "easy",
      "prompt": "Code: 253='books are old', 546='man is old', 378='buy good books'. Code for 'old'?",
      "options": [
        "2",
        "5",
        "6",
        "3"
      ],
      "correctIndex": 2,
      "explanation": "'old' is common to first two: digit 6."
    },
    {
      "id": "logical-q48",
      "difficulty": "easy",
      "prompt": "Code: 123='hot filtered coffee', 356='filtered hot tea'. Code for 'filtered'?",
      "options": [
        "1",
        "2",
        "3",
        "5"
      ],
      "correctIndex": 2,
      "explanation": "'filtered' is common: digit 3."
    },
    {
      "id": "logical-q49",
      "difficulty": "easy",
      "prompt": "Code: 256='she is clever', 751='he is honest', 328='clever and honest'. Code for 'is'?",
      "options": [
        "2",
        "5",
        "6",
        "7"
      ],
      "correctIndex": 1,
      "explanation": "'is' is common to first two: digit 5."
    },
    {
      "id": "logical-q50",
      "difficulty": "easy",
      "prompt": "If MACHINE is 19-7-9-14-15-20-11, how is DANGER coded?",
      "options": [
        "4-1-20-7-5-18",
        "4-1-14-7-5-18",
        "4-1-14-7-5-8",
        "4-1-20-7-5-8"
      ],
      "correctIndex": 1,
      "explanation": "D=4, A=1, N=14, G=7, E=5, R=18."
    },
    {
      "id": "logical-q51",
      "difficulty": "easy",
      "prompt": "Find the next letter group: AZ, BY, CX, ?",
      "options": [
        "DW",
        "DX",
        "DY",
        "EV"
      ],
      "correctIndex": 0,
      "explanation": "First advances, second retreats: DW."
    },
    {
      "id": "logical-q52",
      "difficulty": "easy",
      "prompt": "Find the next group: ZA, YB, XC, ?",
      "options": [
        "WD",
        "WE",
        "VD",
        "XD"
      ],
      "correctIndex": 0,
      "explanation": "Z→W and A→D."
    },
    {
      "id": "logical-q53",
      "difficulty": "easy",
      "prompt": "Find the next letter: A, C, F, J, ?",
      "options": [
        "M",
        "N",
        "O",
        "P"
      ],
      "correctIndex": 2,
      "explanation": "Gaps +2,+3,+4,+5: J + 5 = O."
    },
    {
      "id": "logical-q54",
      "difficulty": "easy",
      "prompt": "Find the next letter: B, D, G, K, ?",
      "options": [
        "N",
        "O",
        "P",
        "Q"
      ],
      "correctIndex": 2,
      "explanation": "Gaps +2,+3,+4,+5: K + 5 = P."
    },
    {
      "id": "logical-q55",
      "difficulty": "easy",
      "prompt": "Find the next letter: Z, X, V, T, ?",
      "options": [
        "Q",
        "R",
        "S",
        "P"
      ],
      "correctIndex": 1,
      "explanation": "Retreat by 2: T − 2 = R."
    },
    {
      "id": "logical-q56",
      "difficulty": "medium",
      "prompt": "What comes next: J, F, M, A, M, ?",
      "options": [
        "J",
        "S",
        "O",
        "N"
      ],
      "correctIndex": 0,
      "explanation": "Month initials: Jun."
    },
    {
      "id": "logical-q57",
      "difficulty": "medium",
      "prompt": "Find the next group: ACE, BDF, CEG, ?",
      "options": [
        "DFH",
        "DEH",
        "DFI",
        "CFH"
      ],
      "correctIndex": 0,
      "explanation": "Each letter +1: DFH."
    },
    {
      "id": "logical-q58",
      "difficulty": "medium",
      "prompt": "If NORTH reversed is HTUOS, how is EAST reversed?",
      "options": [
        "TSAE",
        "ESTA",
        "TSEA",
        "AETS"
      ],
      "correctIndex": 0,
      "explanation": "EAST reversed is TSAE."
    },
    {
      "id": "logical-q59",
      "difficulty": "medium",
      "prompt": "P is father of Q. Q is father of R. How is P related to R?",
      "options": [
        "Father",
        "Grandfather",
        "Uncle",
        "Brother"
      ],
      "correctIndex": 1,
      "explanation": "P is Q's father and Q is R's father."
    },
    {
      "id": "logical-q60",
      "difficulty": "medium",
      "prompt": "M is brother of N. N is sister of O. O is father of P. How is M related to P?",
      "options": [
        "Father",
        "Uncle",
        "Brother",
        "Grandfather"
      ],
      "correctIndex": 1,
      "explanation": "M and O are siblings; M is P's uncle."
    },
    {
      "id": "logical-q61",
      "difficulty": "medium",
      "prompt": "A is B's mother. B is C's brother. How is A related to C?",
      "options": [
        "Sister",
        "Mother",
        "Aunt",
        "Grandmother"
      ],
      "correctIndex": 1,
      "explanation": "A is mother of both B and C."
    },
    {
      "id": "logical-q62",
      "difficulty": "medium",
      "prompt": "X's father's only daughter is Y. How is Y related to X (X is male)?",
      "options": [
        "Mother",
        "Sister",
        "Daughter",
        "Aunt"
      ],
      "correctIndex": 1,
      "explanation": "Father's only daughter is X's sister."
    },
    {
      "id": "logical-q63",
      "difficulty": "medium",
      "prompt": "Ravi: 'She is the daughter of my grandfather's only son.' Who is she?",
      "options": [
        "Ravi's mother",
        "Ravi's sister",
        "Ravi's daughter",
        "Ravi's aunt"
      ],
      "correctIndex": 1,
      "explanation": "Grandfather's only son is Ravi's father."
    },
    {
      "id": "logical-q64",
      "difficulty": "medium",
      "prompt": "C is A's sister. B is A's father. How is B related to C?",
      "options": [
        "Brother",
        "Father",
        "Uncle",
        "Grandfather"
      ],
      "correctIndex": 1,
      "explanation": "B is father of both A and C."
    },
    {
      "id": "logical-q65",
      "difficulty": "medium",
      "prompt": "D is E's son. F is E's wife. How is F related to D?",
      "options": [
        "Sister",
        "Mother",
        "Aunt",
        "Grandmother"
      ],
      "correctIndex": 1,
      "explanation": "F is D's mother."
    },
    {
      "id": "logical-q66",
      "difficulty": "medium",
      "prompt": "All roses are flowers. Some flowers fade quickly. Conclusion: Some roses fade quickly.",
      "options": [
        "Definitely true",
        "Definitely false",
        "Cannot be determined",
        "Both true and false"
      ],
      "correctIndex": 2,
      "explanation": "Roses may not be among flowers that fade quickly."
    },
    {
      "id": "logical-q67",
      "difficulty": "medium",
      "prompt": "No cats are dogs. All dogs are pets. Conclusion: No cats are pets.",
      "options": [
        "Definitely true",
        "Definitely false",
        "Cannot be determined",
        "Partially true"
      ],
      "correctIndex": 2,
      "explanation": "Cats may still be pets."
    },
    {
      "id": "logical-q68",
      "difficulty": "medium",
      "prompt": "All managers are leaders. Some leaders are innovators. Conclusion: Some managers are innovators.",
      "options": [
        "Definitely true",
        "Definitely false",
        "Cannot be determined",
        "Both A and B"
      ],
      "correctIndex": 2,
      "explanation": "Innovators may exclude all managers."
    },
    {
      "id": "logical-q69",
      "difficulty": "medium",
      "prompt": "All students passed. Some who passed got scholarships. Conclusion: Some students got scholarships.",
      "options": [
        "Definitely true",
        "Definitely false",
        "Cannot be determined",
        "Ambiguous"
      ],
      "correctIndex": 0,
      "explanation": "Scholarship recipients are students who passed."
    },
    {
      "id": "logical-q70",
      "difficulty": "medium",
      "prompt": "All birds have wings. Penguins are birds. Conclusion: Penguins have wings.",
      "options": [
        "Definitely true",
        "Definitely false",
        "Cannot be determined",
        "Partially true"
      ],
      "correctIndex": 0,
      "explanation": "Penguins are birds."
    },
    {
      "id": "logical-q71",
      "difficulty": "medium",
      "prompt": "All APIs are endpoints. Some endpoints are cached. Conclusion: Some APIs are cached.",
      "options": [
        "Definitely true",
        "Definitely false",
        "Does not necessarily follow",
        "Always false"
      ],
      "correctIndex": 2,
      "explanation": "Cached endpoints might not be APIs."
    },
    {
      "id": "logical-q72",
      "difficulty": "medium",
      "prompt": "No reptiles are mammals. All snakes are reptiles. Conclusion: No snakes are mammals.",
      "options": [
        "Definitely true",
        "Definitely false",
        "Cannot be determined",
        "Partially true"
      ],
      "correctIndex": 0,
      "explanation": "Snakes are reptiles."
    },
    {
      "id": "logical-q73",
      "difficulty": "medium",
      "prompt": "Angle between hands at 6:00?",
      "options": [
        "0°",
        "90°",
        "120°",
        "180°"
      ],
      "correctIndex": 3,
      "explanation": "Hands point opposite: 180°."
    },
    {
      "id": "logical-q74",
      "difficulty": "medium",
      "prompt": "Angle between hands at 9:30?",
      "options": [
        "75°",
        "90°",
        "105°",
        "120°"
      ],
      "correctIndex": 2,
      "explanation": "Hour 285°, minute 180°: difference 105°."
    },
    {
      "id": "logical-q75",
      "difficulty": "medium",
      "prompt": "Angle between hands at 4:20?",
      "options": [
        "0°",
        "10°",
        "20°",
        "30°"
      ],
      "correctIndex": 1,
      "explanation": "Hour ≈130°, minute 120°: ≈10°."
    },
    {
      "id": "logical-q76",
      "difficulty": "medium",
      "prompt": "Clock loses 6 min/hour. Set at noon, what does it show at actual 4:00 PM?",
      "options": [
        "3:24 PM",
        "3:36 PM",
        "3:48 PM",
        "4:24 PM"
      ],
      "correctIndex": 1,
      "explanation": "4×54 = 216 min = 3 h 36 min."
    },
    {
      "id": "logical-q77",
      "difficulty": "medium",
      "prompt": "How many times do clock hands overlap in 12 hours?",
      "options": [
        "10",
        "11",
        "12",
        "22"
      ],
      "correctIndex": 1,
      "explanation": "Hands overlap 11 times in 12 hours."
    },
    {
      "id": "logical-q78",
      "difficulty": "medium",
      "prompt": "When between 2:00 and 3:00 do the hands coincide?",
      "options": [
        "2:10",
        "2:12",
        "2:15",
        "2:20"
      ],
      "correctIndex": 0,
      "explanation": "At 2 + 10/11 hours ≈ 2:10:54."
    },
    {
      "id": "logical-q79",
      "difficulty": "medium",
      "prompt": "If 1 Jan 2001 was Monday, what day was 1 Jan 2002?",
      "options": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday"
      ],
      "correctIndex": 1,
      "explanation": "365 days = 52 weeks + 1 → Tuesday."
    },
    {
      "id": "logical-q80",
      "difficulty": "medium",
      "prompt": "If today is Friday, what day was 10 days ago?",
      "options": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday"
      ],
      "correctIndex": 1,
      "explanation": "10 mod 7 = 3; Friday − 3 = Tuesday."
    },
    {
      "id": "logical-q81",
      "difficulty": "medium",
      "prompt": "If Monday was 2 days ago, what day is the day after tomorrow?",
      "options": [
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "correctIndex": 1,
      "explanation": "Today is Wednesday; day after tomorrow is Friday."
    },
    {
      "id": "logical-q82",
      "difficulty": "medium",
      "prompt": "What day was 28 Feb 2024?",
      "options": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday"
      ],
      "correctIndex": 2,
      "explanation": "28 Feb 2024 was Wednesday."
    },
    {
      "id": "logical-q83",
      "difficulty": "medium",
      "prompt": "How many months have exactly 30 days?",
      "options": [
        "4",
        "5",
        "6",
        "7"
      ],
      "correctIndex": 0,
      "explanation": "Apr, Jun, Sep, Nov."
    },
    {
      "id": "logical-q84",
      "difficulty": "medium",
      "prompt": "Watch gains 5 min/hour. Set at 6 AM, actual time when it shows 9 AM?",
      "options": [
        "8:00 AM",
        "8:15 AM",
        "8:30 AM",
        "8:45 AM"
      ],
      "correctIndex": 3,
      "explanation": "Real ≈ 180×60/65 min ≈ 2h 46m → ~8:46 AM."
    },
    {
      "id": "logical-q85",
      "difficulty": "medium",
      "prompt": "Walk 5 km North, 3 km East. Distance from start?",
      "options": [
        "2 km",
        "4 km",
        "√34 km",
        "8 km"
      ],
      "correctIndex": 2,
      "explanation": "√(5² + 3²) = √34 km."
    },
    {
      "id": "logical-q86",
      "difficulty": "medium",
      "prompt": "Walk 3 km South, 4 km West, 3 km North. Distance from start?",
      "options": [
        "3 km",
        "4 km",
        "5 km",
        "7 km"
      ],
      "correctIndex": 1,
      "explanation": "Net 4 km West."
    },
    {
      "id": "logical-q87",
      "difficulty": "medium",
      "prompt": "If South-East becomes North, what does North-West become?",
      "options": [
        "South",
        "South-East",
        "East",
        "West"
      ],
      "correctIndex": 0,
      "explanation": "Same 135° CCW rotation."
    },
    {
      "id": "logical-q88",
      "difficulty": "medium",
      "prompt": "Face North, 90° CW then 180° CCW. Facing?",
      "options": [
        "North",
        "East",
        "West",
        "South"
      ],
      "correctIndex": 2,
      "explanation": "N → E → W."
    },
    {
      "id": "logical-q89",
      "difficulty": "medium",
      "prompt": "Face East, turn 270° clockwise. Facing?",
      "options": [
        "North",
        "South",
        "East",
        "West"
      ],
      "correctIndex": 0,
      "explanation": "270° CW from East is North."
    },
    {
      "id": "logical-q90",
      "difficulty": "medium",
      "prompt": "Row of 25, Sita 12th from left. Position from right?",
      "options": [
        "12th",
        "13th",
        "14th",
        "15th"
      ],
      "correctIndex": 2,
      "explanation": "25 − 12 + 1 = 14th."
    },
    {
      "id": "logical-q91",
      "difficulty": "hard",
      "prompt": "Row of 40, Raj 15th from left, Priya 20th from right. Swap; Raj is 20th from left. Priya from left?",
      "options": [
        "15th",
        "20th",
        "25th",
        "30th"
      ],
      "correctIndex": 0,
      "explanation": "Priya takes Raj's old spot."
    },
    {
      "id": "logical-q92",
      "difficulty": "hard",
      "prompt": "50 students: 30 Math, 25 Science, 15 both. Only Math?",
      "options": [
        "10",
        "15",
        "20",
        "25"
      ],
      "correctIndex": 1,
      "explanation": "30 − 15 = 15."
    },
    {
      "id": "logical-q93",
      "difficulty": "hard",
      "prompt": "100 people: 70 tea, 60 coffee, 40 both. Neither?",
      "options": [
        "0",
        "10",
        "20",
        "30"
      ],
      "correctIndex": 1,
      "explanation": "90 like at least one; 10 neither."
    },
    {
      "id": "logical-q94",
      "difficulty": "hard",
      "prompt": "A taller than B. C shorter than B. D taller than A. Shortest?",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctIndex": 2,
      "explanation": "D > A > B > C."
    },
    {
      "id": "logical-q95",
      "difficulty": "hard",
      "prompt": "BOOK : READ :: FOOD : ?",
      "options": [
        "Cook",
        "Eat",
        "Kitchen",
        "Hungry"
      ],
      "correctIndex": 1,
      "explanation": "Read books, eat food."
    },
    {
      "id": "logical-q96",
      "difficulty": "hard",
      "prompt": "DOCTOR : PATIENT :: LAWYER : ?",
      "options": [
        "Judge",
        "Client",
        "Court",
        "Case"
      ],
      "correctIndex": 1,
      "explanation": "Professional serves client."
    },
    {
      "id": "logical-q97",
      "difficulty": "hard",
      "prompt": "Pen : Write :: Knife : ?",
      "options": [
        "Cut",
        "Sharp",
        "Kitchen",
        "Steel"
      ],
      "correctIndex": 0,
      "explanation": "Tool and use."
    },
    {
      "id": "logical-q98",
      "difficulty": "hard",
      "prompt": "Bird : Fly :: Fish : ?",
      "options": [
        "Water",
        "Swim",
        "Ocean",
        "Scale"
      ],
      "correctIndex": 1,
      "explanation": "Birds fly; fish swim."
    },
    {
      "id": "logical-q99",
      "difficulty": "hard",
      "prompt": "Eye : See :: Ear : ?",
      "options": [
        "Sound",
        "Hear",
        "Listen",
        "Noise"
      ],
      "correctIndex": 1,
      "explanation": "Sensory function."
    },
    {
      "id": "logical-q100",
      "difficulty": "hard",
      "prompt": "Odd one out: Circle, Square, Triangle, Cube",
      "options": [
        "Circle",
        "Square",
        "Triangle",
        "Cube"
      ],
      "correctIndex": 3,
      "explanation": "Cube is 3D."
    },
    {
      "id": "logical-q101",
      "difficulty": "hard",
      "prompt": "Odd one out: January, March, April, July",
      "options": [
        "January",
        "March",
        "April",
        "July"
      ],
      "correctIndex": 2,
      "explanation": "April has 30 days."
    },
    {
      "id": "logical-q102",
      "difficulty": "hard",
      "prompt": "Odd one out: Mercury, Venus, Earth, Moon",
      "options": [
        "Mercury",
        "Venus",
        "Earth",
        "Moon"
      ],
      "correctIndex": 3,
      "explanation": "Moon is a satellite."
    },
    {
      "id": "logical-q103",
      "difficulty": "hard",
      "prompt": "Odd one out: Dog, Cat, Lion, Table",
      "options": [
        "Dog",
        "Cat",
        "Lion",
        "Table"
      ],
      "correctIndex": 3,
      "explanation": "Table is not an animal."
    },
    {
      "id": "logical-q104",
      "difficulty": "hard",
      "prompt": "Odd one out: Addition, Subtraction, Multiplication, Equation",
      "options": [
        "Addition",
        "Subtraction",
        "Multiplication",
        "Equation"
      ],
      "correctIndex": 3,
      "explanation": "Equation is a statement."
    },
    {
      "id": "logical-q105",
      "difficulty": "hard",
      "prompt": "Odd one out: Piano, Guitar, Violin, Drum",
      "options": [
        "Piano",
        "Guitar",
        "Violin",
        "Drum"
      ],
      "correctIndex": 3,
      "explanation": "Drum is percussion."
    },
    {
      "id": "logical-q106",
      "difficulty": "hard",
      "prompt": "If ×=+, +=−, −=×, ÷=÷: 15 − 3 + 10 × 5 ÷ 5 = ?",
      "options": [
        "30",
        "34",
        "36",
        "40"
      ],
      "correctIndex": 2,
      "explanation": "15×3 − 10+5÷5 = 36."
    },
    {
      "id": "logical-q107",
      "difficulty": "hard",
      "prompt": "If ×=+, +=−, −=×, ÷=÷: 8 − 2 + 3 × 4 ÷ 2 = ?",
      "options": [
        "13",
        "15",
        "17",
        "19"
      ],
      "correctIndex": 1,
      "explanation": "8×2 − 3+4÷2 = 15."
    },
    {
      "id": "logical-q108",
      "difficulty": "hard",
      "prompt": "If ×=+, +=−, −=×, ÷=÷: 6 − 2 + 4 × 3 ÷ 3 = ?",
      "options": [
        "7",
        "9",
        "11",
        "13"
      ],
      "correctIndex": 1,
      "explanation": "6×2 − 4+3÷3 = 9."
    },
    {
      "id": "logical-q109",
      "difficulty": "hard",
      "prompt": "Train 100 m passes a pole in 10 s. Speed in km/h?",
      "options": [
        "36",
        "40",
        "45",
        "50"
      ],
      "correctIndex": 0,
      "explanation": "10 m/s = 36 km/h."
    },
    {
      "id": "logical-q110",
      "difficulty": "hard",
      "prompt": "Buy ₹80, sell ₹100. Profit %?",
      "options": [
        "20%",
        "25%",
        "30%",
        "40%"
      ],
      "correctIndex": 1,
      "explanation": "20/80 = 25%."
    },
    {
      "id": "logical-q111",
      "difficulty": "hard",
      "prompt": "How many edges on a cube?",
      "options": [
        "6",
        "8",
        "10",
        "12"
      ],
      "correctIndex": 3,
      "explanation": "12 edges."
    },
    {
      "id": "logical-q112",
      "difficulty": "hard",
      "prompt": "Triangle divided by medians: how many triangles?",
      "options": [
        "4",
        "6",
        "8",
        "12"
      ],
      "correctIndex": 1,
      "explanation": "Three medians → 6."
    },
    {
      "id": "logical-q113",
      "difficulty": "hard",
      "prompt": "Squares on an 8×8 chessboard?",
      "options": [
        "64",
        "128",
        "204",
        "256"
      ],
      "correctIndex": 2,
      "explanation": "Sum 1²…8² = 204."
    },
    {
      "id": "logical-q114",
      "difficulty": "hard",
      "prompt": "4×4×4 painted cube cut into 64. Unpainted cubes?",
      "options": [
        "4",
        "6",
        "8",
        "16"
      ],
      "correctIndex": 2,
      "explanation": "Inner 2×2×2 = 8."
    },
    {
      "id": "logical-q115",
      "difficulty": "hard",
      "prompt": "4×4×4 painted cube. Exactly one face painted?",
      "options": [
        "8",
        "16",
        "24",
        "48"
      ],
      "correctIndex": 2,
      "explanation": "6×4 = 24."
    },
    {
      "id": "logical-q116",
      "difficulty": "hard",
      "prompt": "10 players, round robin. Matches?",
      "options": [
        "45",
        "50",
        "90",
        "100"
      ],
      "correctIndex": 0,
      "explanation": "¹⁰C₂ = 45."
    },
    {
      "id": "logical-q117",
      "difficulty": "hard",
      "prompt": "Five in a row: A not at ends, B right of C, D between A and E. Middle?",
      "options": [
        "A",
        "B",
        "C",
        "D"
      ],
      "correctIndex": 0,
      "explanation": "Order C,B,A,D,E."
    },
    {
      "id": "logical-q118",
      "difficulty": "hard",
      "prompt": "Six around circle: A opposite D, B between A and C. Opposite B?",
      "options": [
        "C",
        "D",
        "E",
        "F"
      ],
      "correctIndex": 2,
      "explanation": "E opposite B."
    },
    {
      "id": "logical-q119",
      "difficulty": "hard",
      "prompt": "Seven in row: P 3rd left, Q 2nd right, R between. Right of R?",
      "options": [
        "1",
        "2",
        "3",
        "4"
      ],
      "correctIndex": 1,
      "explanation": "R=5, two right."
    },
    {
      "id": "logical-q120",
      "difficulty": "hard",
      "prompt": "8 workers, 10 days. 4 workers need?",
      "options": [
        "5",
        "10",
        "16",
        "20"
      ],
      "correctIndex": 3,
      "explanation": "80 worker-days ÷ 4 = 20."
    }
  ],
  "cs": [
    {
      "id": "cs-q26",
      "difficulty": "easy",
      "prompt": "Which structure gives O(1) average lookup with a good hash?",
      "options": [
        "Array",
        "Hash table",
        "Linked list",
        "Binary tree"
      ],
      "correctIndex": 1,
      "explanation": "Expected O(1) with good hash and load factor."
    },
    {
      "id": "cs-q27",
      "difficulty": "easy",
      "prompt": "A stack follows which order?",
      "options": [
        "FIFO",
        "LIFO",
        "Priority",
        "Sorted"
      ],
      "correctIndex": 1,
      "explanation": "Last in, first out."
    },
    {
      "id": "cs-q28",
      "difficulty": "easy",
      "prompt": "A queue follows which order?",
      "options": [
        "LIFO",
        "FIFO",
        "Random",
        "Heap order"
      ],
      "correctIndex": 1,
      "explanation": "First in, first out."
    },
    {
      "id": "cs-q29",
      "difficulty": "easy",
      "prompt": "Worst-case binary search on n sorted items?",
      "options": [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n log n)"
      ],
      "correctIndex": 1,
      "explanation": "Halves search space each step."
    },
    {
      "id": "cs-q30",
      "difficulty": "easy",
      "prompt": "Which traversal visits root between subtrees?",
      "options": [
        "Preorder",
        "Inorder",
        "Postorder",
        "Level order"
      ],
      "correctIndex": 1,
      "explanation": "Inorder: left, root, right."
    },
    {
      "id": "cs-q31",
      "difficulty": "easy",
      "prompt": "TCP provides:",
      "options": [
        "Unreliable datagrams",
        "Reliable ordered byte stream",
        "Broadcast only",
        "No connection"
      ],
      "correctIndex": 1,
      "explanation": "Connection-oriented and reliable."
    },
    {
      "id": "cs-q32",
      "difficulty": "easy",
      "prompt": "UDP is best when you need:",
      "options": [
        "Guaranteed delivery",
        "Low latency and can tolerate loss",
        "Ordered streams always",
        "Three-way handshake"
      ],
      "correctIndex": 1,
      "explanation": "UDP is connectionless and lightweight."
    },
    {
      "id": "cs-q33",
      "difficulty": "easy",
      "prompt": "HTTP 404 means:",
      "options": [
        "Unauthorized",
        "Forbidden",
        "Not Found",
        "Server Error"
      ],
      "correctIndex": 2,
      "explanation": "Resource not found."
    },
    {
      "id": "cs-q34",
      "difficulty": "easy",
      "prompt": "HTTP 401 typically means:",
      "options": [
        "Not Found",
        "Unauthorized",
        "Redirect",
        "Rate limited"
      ],
      "correctIndex": 1,
      "explanation": "Authentication required or failed."
    },
    {
      "id": "cs-q35",
      "difficulty": "easy",
      "prompt": "Primary key in a relational table must be:",
      "options": [
        "Nullable",
        "Unique and not null",
        "Always composite",
        "A foreign key"
      ],
      "correctIndex": 1,
      "explanation": "Identifies rows uniquely."
    },
    {
      "id": "cs-q36",
      "difficulty": "easy",
      "prompt": "Foreign key enforces:",
      "options": [
        "CPU scheduling",
        "Referential integrity",
        "DNS lookup",
        "Cache eviction"
      ],
      "correctIndex": 1,
      "explanation": "Links must reference valid parent rows."
    },
    {
      "id": "cs-q37",
      "difficulty": "easy",
      "prompt": "Normalization mainly reduces:",
      "options": [
        "Network latency",
        "Redundancy and update anomalies",
        "Compile time",
        "Disk size always"
      ],
      "correctIndex": 1,
      "explanation": "Reduces duplicate data and anomalies."
    },
    {
      "id": "cs-q38",
      "difficulty": "easy",
      "prompt": "ACID 'A' stands for:",
      "options": [
        "Availability",
        "Atomicity",
        "Asynchronous",
        "Addressing"
      ],
      "correctIndex": 1,
      "explanation": "All or nothing transactions."
    },
    {
      "id": "cs-q39",
      "difficulty": "easy",
      "prompt": "Which is volatile memory?",
      "options": [
        "SSD",
        "RAM",
        "HDD",
        "Tape"
      ],
      "correctIndex": 1,
      "explanation": "RAM loses data without power."
    },
    {
      "id": "cs-q40",
      "difficulty": "easy",
      "prompt": "CPU cache is used to:",
      "options": [
        "Store passwords",
        "Reduce average memory access time",
        "Replace the OS",
        "Encrypt disks"
      ],
      "correctIndex": 1,
      "explanation": "Brings frequently used data closer to CPU."
    },
    {
      "id": "cs-q41",
      "difficulty": "easy",
      "prompt": "Which OSI layer handles routing?",
      "options": [
        "Data link",
        "Network",
        "Transport",
        "Application"
      ],
      "correctIndex": 1,
      "explanation": "Layer 3 routes packets."
    },
    {
      "id": "cs-q42",
      "difficulty": "easy",
      "prompt": "DNS translates:",
      "options": [
        "IP to MAC",
        "Domain names to IP addresses",
        "Files to blocks",
        "Threads to processes"
      ],
      "correctIndex": 1,
      "explanation": "Name resolution."
    },
    {
      "id": "cs-q43",
      "difficulty": "easy",
      "prompt": "IPv4 address size?",
      "options": [
        "16 bits",
        "32 bits",
        "64 bits",
        "128 bits"
      ],
      "correctIndex": 1,
      "explanation": "32-bit addresses."
    },
    {
      "id": "cs-q44",
      "difficulty": "easy",
      "prompt": "IPv6 address size?",
      "options": [
        "32 bits",
        "64 bits",
        "128 bits",
        "256 bits"
      ],
      "correctIndex": 2,
      "explanation": "128-bit addresses."
    },
    {
      "id": "cs-q45",
      "difficulty": "easy",
      "prompt": "Which HTTP method is idempotent?",
      "options": [
        "POST",
        "PUT",
        "PATCH always",
        "CONNECT"
      ],
      "correctIndex": 1,
      "explanation": "Repeating PUT should have same effect."
    },
    {
      "id": "cs-q46",
      "difficulty": "easy",
      "prompt": "HTTPS adds security mainly via:",
      "options": [
        "FTP",
        "TLS/SSL",
        "SMTP",
        "ARP"
      ],
      "correctIndex": 1,
      "explanation": "TLS encrypts HTTP traffic."
    },
    {
      "id": "cs-q47",
      "difficulty": "easy",
      "prompt": "Deadlock requires (Coffman):",
      "options": [
        "Only mutual exclusion",
        "Mutual exclusion, hold-and-wait, no preemption, circular wait",
        "Only paging",
        "Only interrupts"
      ],
      "correctIndex": 1,
      "explanation": "All four conditions together."
    },
    {
      "id": "cs-q48",
      "difficulty": "easy",
      "prompt": "Paging divides memory into:",
      "options": [
        "Files and folders",
        "Fixed-size pages and frames",
        "Stacks only",
        "Registers"
      ],
      "correctIndex": 1,
      "explanation": "Virtual memory in pages."
    },
    {
      "id": "cs-q49",
      "difficulty": "easy",
      "prompt": "A process is:",
      "options": [
        "A thread only",
        "A program in execution with its own resources",
        "A file descriptor",
        "A cache line"
      ],
      "correctIndex": 1,
      "explanation": "Has address space and resources."
    },
    {
      "id": "cs-q50",
      "difficulty": "easy",
      "prompt": "Threads in the same process share:",
      "options": [
        "Nothing",
        "Address space and resources like open files",
        "Separate address space always",
        "Separate disk"
      ],
      "correctIndex": 1,
      "explanation": "Threads share process memory."
    },
    {
      "id": "cs-q51",
      "difficulty": "easy",
      "prompt": "Semaphores are used for:",
      "options": [
        "Sorting arrays",
        "Synchronization and mutual exclusion",
        "DNS caching",
        "HTML parsing"
      ],
      "correctIndex": 1,
      "explanation": "Coordinate concurrent access."
    },
    {
      "id": "cs-q52",
      "difficulty": "easy",
      "prompt": "Belady's anomaly can occur with:",
      "options": [
        "LRU cache",
        "FIFO page replacement",
        "Optimal replacement never",
        "Stack allocation"
      ],
      "correctIndex": 1,
      "explanation": "More frames can increase faults with FIFO."
    },
    {
      "id": "cs-q53",
      "difficulty": "easy",
      "prompt": "B-tree is commonly used in:",
      "options": [
        "GPUs",
        "Database indexes",
        "DNS only",
        "Keyboard drivers"
      ],
      "correctIndex": 1,
      "explanation": "Disk-friendly balanced tree indexes."
    },
    {
      "id": "cs-q54",
      "difficulty": "easy",
      "prompt": "AVL tree property:",
      "options": [
        "Unbalanced heights",
        "Heights of subtrees differ by at most 1",
        "Always complete",
        "Always a heap"
      ],
      "correctIndex": 1,
      "explanation": "Self-balancing BST."
    },
    {
      "id": "cs-q55",
      "difficulty": "easy",
      "prompt": "Red-black tree guarantees:",
      "options": [
        "O(1) search",
        "O(log n) search/insert/delete",
        "O(n) always",
        "No rotations"
      ],
      "correctIndex": 1,
      "explanation": "Balanced BST operations are logarithmic."
    },
    {
      "id": "cs-q56",
      "difficulty": "easy",
      "prompt": "Graph BFS uses which structure?",
      "options": [
        "Stack",
        "Queue",
        "Priority queue only",
        "Hash set only"
      ],
      "correctIndex": 1,
      "explanation": "FIFO queue for level order."
    },
    {
      "id": "cs-q57",
      "difficulty": "easy",
      "prompt": "Graph DFS naturally uses:",
      "options": [
        "Queue",
        "Stack (or recursion)",
        "Heap",
        "Circular buffer only"
      ],
      "correctIndex": 1,
      "explanation": "LIFO stack or recursion."
    },
    {
      "id": "cs-q58",
      "difficulty": "easy",
      "prompt": "Dijkstra fails with:",
      "options": [
        "Positive weights",
        "Negative edge weights",
        "Undirected edges",
        "Multiple components"
      ],
      "correctIndex": 1,
      "explanation": "Negative edges break greedy finalization."
    },
    {
      "id": "cs-q59",
      "difficulty": "easy",
      "prompt": "Bellman-Ford handles:",
      "options": [
        "Only trees",
        "Negative edge weights (no negative cycles)",
        "Only unweighted graphs",
        "Only DAGs"
      ],
      "correctIndex": 1,
      "explanation": "Supports negative weights if no negative cycle."
    },
    {
      "id": "cs-q60",
      "difficulty": "easy",
      "prompt": "Kruskal builds:",
      "options": [
        "Shortest path tree",
        "Minimum spanning tree",
        "Max flow",
        "Topological order"
      ],
      "correctIndex": 1,
      "explanation": "MST via edge sorting and union-find."
    },
    {
      "id": "cs-q61",
      "difficulty": "medium",
      "prompt": "Quickselect average complexity for kth smallest?",
      "options": [
        "O(n)",
        "O(n log n)",
        "O(n²)",
        "O(log n)"
      ],
      "correctIndex": 0,
      "explanation": "Average linear time."
    },
    {
      "id": "cs-q62",
      "difficulty": "medium",
      "prompt": "Merge sort space complexity (typical array impl)?",
      "options": [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n²)"
      ],
      "correctIndex": 2,
      "explanation": "Needs auxiliary array O(n)."
    },
    {
      "id": "cs-q63",
      "difficulty": "medium",
      "prompt": "In-place heapsort extra space?",
      "options": [
        "O(1) extra",
        "O(n) extra always",
        "O(log n) stack only",
        "O(n log n)"
      ],
      "correctIndex": 0,
      "explanation": "In-place aside from recursion stack."
    },
    {
      "id": "cs-q64",
      "difficulty": "medium",
      "prompt": "Open addressing handles collisions by:",
      "options": [
        "Creating a linked list",
        "Probing for another slot",
        "Deleting keys",
        "Sharding only"
      ],
      "correctIndex": 1,
      "explanation": "Probe sequence in table."
    },
    {
      "id": "cs-q65",
      "difficulty": "medium",
      "prompt": "Chaining in hash tables uses:",
      "options": [
        "Linear probing",
        "Linked lists at buckets",
        "CPU caches",
        "B-trees only"
      ],
      "correctIndex": 1,
      "explanation": "Each bucket holds a chain/list."
    },
    {
      "id": "cs-q66",
      "difficulty": "medium",
      "prompt": "SQL JOIN returning all rows from both with NULLs for non-matches?",
      "options": [
        "INNER",
        "FULL OUTER",
        "CROSS",
        "SELF only"
      ],
      "correctIndex": 1,
      "explanation": "FULL OUTER keeps unmatched rows."
    },
    {
      "id": "cs-q67",
      "difficulty": "medium",
      "prompt": "Index on a column mainly speeds up:",
      "options": [
        "Inserts always",
        "SELECT/WHERE on that column",
        "Deletes only",
        "Full table scans always"
      ],
      "correctIndex": 1,
      "explanation": "Speeds lookups at some write cost."
    },
    {
      "id": "cs-q68",
      "difficulty": "medium",
      "prompt": "Two-phase commit ensures:",
      "options": [
        "Faster reads",
        "Distributed transaction atomicity",
        "IPv6 migration",
        "Cache coherence only"
      ],
      "correctIndex": 1,
      "explanation": "All participants commit or abort."
    },
    {
      "id": "cs-q69",
      "difficulty": "medium",
      "prompt": "Little's Law relates:",
      "options": [
        "L = λW",
        "CPU = RAM × disk",
        "HTTP = TCP + UDP",
        "Cache = O(n²)"
      ],
      "correctIndex": 0,
      "explanation": "L = λW in steady state."
    },
    {
      "id": "cs-q70",
      "difficulty": "medium",
      "prompt": "Moore's Law historically described:",
      "options": [
        "Transistor density doubling ~every two years",
        "RAM is free",
        "Networks are always secure",
        "OSI has 5 layers"
      ],
      "correctIndex": 0,
      "explanation": "Transistor count trend."
    },
    {
      "id": "cs-q71",
      "difficulty": "medium",
      "prompt": "Which register holds the next instruction address (typical)?",
      "options": [
        "Stack pointer",
        "Program counter",
        "Accumulator only",
        "MAR always"
      ],
      "correctIndex": 1,
      "explanation": "PC points to next instruction."
    },
    {
      "id": "cs-q72",
      "difficulty": "medium",
      "prompt": "Pipeline data hazard occurs when:",
      "options": [
        "Cache miss",
        "Instruction depends on prior result",
        "Branch taken",
        "I/O wait"
      ],
      "correctIndex": 1,
      "explanation": "Dependency on unfinished instruction."
    },
    {
      "id": "cs-q73",
      "difficulty": "medium",
      "prompt": "Virtual memory allows:",
      "options": [
        "Infinite RAM physically",
        "Programs larger than physical RAM",
        "No page faults ever",
        "Disabling caches"
      ],
      "correctIndex": 1,
      "explanation": "Uses disk as extension of RAM."
    },
    {
      "id": "cs-q74",
      "difficulty": "medium",
      "prompt": "TLB is a cache for:",
      "options": [
        "Disk blocks",
        "Page table translations",
        "DNS records",
        "HTTP headers"
      ],
      "correctIndex": 1,
      "explanation": "Speeds virtual-to-physical translation."
    },
    {
      "id": "cs-q75",
      "difficulty": "medium",
      "prompt": "Context switch saves:",
      "options": [
        "Only PC",
        "CPU state of the outgoing process/thread",
        "Entire disk",
        "Browser cookies"
      ],
      "correctIndex": 1,
      "explanation": "Registers and execution state."
    },
    {
      "id": "cs-q76",
      "difficulty": "medium",
      "prompt": "Spinlock is best when:",
      "options": [
        "Critical section is long",
        "Wait time is expected to be very short",
        "On single-core only always",
        "Never in kernels"
      ],
      "correctIndex": 1,
      "explanation": "Busy-wait OK for tiny waits."
    },
    {
      "id": "cs-q77",
      "difficulty": "medium",
      "prompt": "RAID 0 provides:",
      "options": [
        "Mirroring",
        "Striping without redundancy",
        "Parity only",
        "Hot spare always"
      ],
      "correctIndex": 1,
      "explanation": "Striping for performance, no redundancy."
    },
    {
      "id": "cs-q78",
      "difficulty": "medium",
      "prompt": "RAID 1 provides:",
      "options": [
        "Striping only",
        "Mirroring",
        "Parity striping",
        "No redundancy"
      ],
      "correctIndex": 1,
      "explanation": "Mirrored copies."
    },
    {
      "id": "cs-q79",
      "difficulty": "medium",
      "prompt": "Endianness refers to:",
      "options": [
        "CPU speed",
        "Byte order in multi-byte values",
        "Thread count",
        "HTTP version"
      ],
      "correctIndex": 1,
      "explanation": "Big vs little endian byte order."
    },
    {
      "id": "cs-q80",
      "difficulty": "medium",
      "prompt": "Compilation stage that checks types?",
      "options": [
        "Linking",
        "Semantic analysis",
        "Assembly output",
        "Bootloading"
      ],
      "correctIndex": 1,
      "explanation": "Type checking in semantic analysis."
    },
    {
      "id": "cs-q81",
      "difficulty": "medium",
      "prompt": "Garbage collection reclaims:",
      "options": [
        "CPU registers",
        "Unreachable heap objects",
        "Open network sockets always",
        "Source files"
      ],
      "correctIndex": 1,
      "explanation": "Frees unused heap memory."
    },
    {
      "id": "cs-q82",
      "difficulty": "medium",
      "prompt": "Reference counting fails on:",
      "options": [
        "Trees",
        "Cycles of references",
        "Integers",
        "Stack frames"
      ],
      "correctIndex": 1,
      "explanation": "Cycles never reach zero count."
    },
    {
      "id": "cs-q83",
      "difficulty": "medium",
      "prompt": "CAP during partition: cannot guarantee both:",
      "options": [
        "Consistency and availability",
        "Compression and caching",
        "CPU and RAM",
        "DNS and HTTP"
      ],
      "correctIndex": 0,
      "explanation": "Pick C or A when P happens."
    },
    {
      "id": "cs-q84",
      "difficulty": "medium",
      "prompt": "Bloom filter may have:",
      "options": [
        "False negatives",
        "False positives",
        "Neither",
        "Both always"
      ],
      "correctIndex": 1,
      "explanation": "Can say maybe present; no false negatives."
    },
    {
      "id": "cs-q85",
      "difficulty": "medium",
      "prompt": "Consistent hashing helps:",
      "options": [
        "Sorting integers",
        "Minimal key redistribution when nodes change",
        "Eliminating TCP",
        "Parsing JSON"
      ],
      "correctIndex": 1,
      "explanation": "Only small slice moves on node add/remove."
    },
    {
      "id": "cs-q86",
      "difficulty": "medium",
      "prompt": "MQTT is suited for:",
      "options": [
        "4K video streaming only",
        "IoT pub/sub with low bandwidth",
        "Compiling C",
        "RAID rebuild"
      ],
      "correctIndex": 1,
      "explanation": "Lightweight IoT messaging."
    },
    {
      "id": "cs-q87",
      "difficulty": "medium",
      "prompt": "SSH primarily provides:",
      "options": [
        "HTML rendering",
        "Encrypted remote shell/file transfer",
        "DNS resolution",
        "GPU scheduling"
      ],
      "correctIndex": 1,
      "explanation": "Secure remote access."
    },
    {
      "id": "cs-q88",
      "difficulty": "medium",
      "prompt": "NAT allows:",
      "options": [
        "IPv6 to IPv4 without translation",
        "Private IPs to share a public IP",
        "Eliminating routers",
        "Disabling firewalls"
      ],
      "correctIndex": 1,
      "explanation": "Network address translation."
    },
    {
      "id": "cs-q89",
      "difficulty": "medium",
      "prompt": "Which is non-preemptive CPU scheduling?",
      "options": [
        "Round robin",
        "FCFS without preemption",
        "Priority with preemption",
        "Multilevel feedback with preemption"
      ],
      "correctIndex": 1,
      "explanation": "FCFS runs until block or finish."
    },
    {
      "id": "cs-q90",
      "difficulty": "medium",
      "prompt": "Thrashing occurs when:",
      "options": [
        "CPU is idle",
        "System spends too much time paging",
        "Cache is too large",
        "Network is fast"
      ],
      "correctIndex": 1,
      "explanation": "Excessive paging dominates."
    },
    {
      "id": "cs-q91",
      "difficulty": "medium",
      "prompt": "Sliding window in TCP helps:",
      "options": [
        "Flow and reliability control",
        "DNS caching",
        "Compile optimization",
        "Disk defrag"
      ],
      "correctIndex": 1,
      "explanation": "Flow control and retransmission window."
    },
    {
      "id": "cs-q92",
      "difficulty": "medium",
      "prompt": "SYN flood attacks exploit:",
      "options": [
        "UDP ports",
        "TCP handshake resource exhaustion",
        "HTML parsing",
        "Git merge"
      ],
      "correctIndex": 1,
      "explanation": "Half-open connection exhaustion."
    },
    {
      "id": "cs-q93",
      "difficulty": "medium",
      "prompt": "Prepared statements prevent:",
      "options": [
        "XSS",
        "SQL injection",
        "CSRF only",
        "DDoS always"
      ],
      "correctIndex": 1,
      "explanation": "Separate query structure from data."
    },
    {
      "id": "cs-q94",
      "difficulty": "medium",
      "prompt": "Write-through cache:",
      "options": [
        "Never writes to memory",
        "Writes to cache and memory together",
        "Only writes on eviction",
        "Is always slower than no cache"
      ],
      "correctIndex": 1,
      "explanation": "Updates cache and backing store."
    },
    {
      "id": "cs-q95",
      "difficulty": "medium",
      "prompt": "MESI protocol relates to:",
      "options": [
        "HTTP caching",
        "Multiprocessor cache coherence",
        "Git branching",
        "RAID parity"
      ],
      "correctIndex": 1,
      "explanation": "Cache line states for coherence."
    },
    {
      "id": "cs-q96",
      "difficulty": "hard",
      "prompt": "Branch predictor reduces:",
      "options": [
        "Memory leaks",
        "Pipeline stalls from mispredicted branches",
        "Disk latency",
        "SQL joins"
      ],
      "correctIndex": 1,
      "explanation": "Avoids flush on wrong guess."
    },
    {
      "id": "cs-q97",
      "difficulty": "hard",
      "prompt": "Which sorting is stable by default?",
      "options": [
        "Heapsort",
        "Mergesort",
        "Quicksort in-place",
        "Selection sort"
      ],
      "correctIndex": 1,
      "explanation": "Mergesort preserves equal-key order."
    },
    {
      "id": "cs-q98",
      "difficulty": "hard",
      "prompt": "Union-find with path compression + rank gives nearly:",
      "options": [
        "O(1) amortized per op",
        "O(log n)",
        "O(n)",
        "O(n log n)"
      ],
      "correctIndex": 0,
      "explanation": "Inverse Ackermann — effectively constant."
    },
    {
      "id": "cs-q99",
      "difficulty": "hard",
      "prompt": "IEEE-754 double has how many exponent bits?",
      "options": [
        "8",
        "11",
        "16",
        "32"
      ],
      "correctIndex": 1,
      "explanation": "64-bit float: 11 exponent bits."
    },
    {
      "id": "cs-q100",
      "difficulty": "hard",
      "prompt": "Which layer is HTTPS on?",
      "options": [
        "Physical",
        "Application (HTTP over TLS)",
        "Data link only",
        "Network only"
      ],
      "correctIndex": 1,
      "explanation": "Application layer over TLS."
    },
    {
      "id": "cs-q101",
      "difficulty": "hard",
      "prompt": "Each thread has its own stack but shares:",
      "options": [
        "Nothing",
        "Heap and process resources",
        "Another thread's stack",
        "Kernel only"
      ],
      "correctIndex": 1,
      "explanation": "Per-thread stacks; shared address space."
    },
    {
      "id": "cs-q102",
      "difficulty": "hard",
      "prompt": "Which protocol uses port 53 by default?",
      "options": [
        "HTTP",
        "DNS",
        "SMTP",
        "SSH"
      ],
      "correctIndex": 1,
      "explanation": "DNS uses UDP/TCP 53."
    },
    {
      "id": "cs-q103",
      "difficulty": "hard",
      "prompt": "Which uses port 443 by default?",
      "options": [
        "HTTP",
        "HTTPS",
        "FTP",
        "Telnet"
      ],
      "correctIndex": 1,
      "explanation": "HTTPS default port."
    },
    {
      "id": "cs-q104",
      "difficulty": "hard",
      "prompt": "LRU cache eviction removes:",
      "options": [
        "Most recently used",
        "Least recently used",
        "Random always",
        "Largest key"
      ],
      "correctIndex": 1,
      "explanation": "Evicts least recently used."
    },
    {
      "id": "cs-q105",
      "difficulty": "hard",
      "prompt": "Dirty bit in a page table indicates:",
      "options": [
        "Page is invalid",
        "Page was modified",
        "Page is read-only always",
        "Page is shared"
      ],
      "correctIndex": 1,
      "explanation": "Must write back before reuse."
    },
    {
      "id": "cs-q106",
      "difficulty": "hard",
      "prompt": "Which data structure for undo in a text editor?",
      "options": [
        "Queue",
        "Stack",
        "Heap",
        "Graph"
      ],
      "correctIndex": 1,
      "explanation": "LIFO undo stack."
    },
    {
      "id": "cs-q107",
      "difficulty": "hard",
      "prompt": "Spanning tree of connected graph with n vertices has how many edges?",
      "options": [
        "n",
        "n−1",
        "n+1",
        "2n"
      ],
      "correctIndex": 1,
      "explanation": "Tree has n−1 edges."
    },
    {
      "id": "cs-q108",
      "difficulty": "hard",
      "prompt": "Maximum edges in simple undirected graph with n vertices?",
      "options": [
        "n",
        "n−1",
        "n(n−1)/2",
        "n²"
      ],
      "correctIndex": 2,
      "explanation": "Complete graph has n(n−1)/2 edges."
    },
    {
      "id": "cs-q109",
      "difficulty": "hard",
      "prompt": "Hamming distance between 1010 and 1111?",
      "options": [
        "1",
        "2",
        "3",
        "4"
      ],
      "correctIndex": 1,
      "explanation": "Two bit positions differ."
    },
    {
      "id": "cs-q110",
      "difficulty": "hard",
      "prompt": "Parity bit detects:",
      "options": [
        "All double-bit errors",
        "Single-bit errors (not all multi-bit)",
        "Any error perfectly",
        "Nothing"
      ],
      "correctIndex": 1,
      "explanation": "Detects odd number of bit flips."
    },
    {
      "id": "cs-q111",
      "difficulty": "hard",
      "prompt": "Which is non-volatile storage?",
      "options": [
        "Register",
        "SRAM cache",
        "SSD",
        "CPU L1"
      ],
      "correctIndex": 2,
      "explanation": "SSD retains data without power."
    },
    {
      "id": "cs-q112",
      "difficulty": "hard",
      "prompt": "Classic 5-stage pipeline order?",
      "options": [
        "Execute, Fetch, Decode, Memory, Writeback",
        "Fetch, Decode, Execute, Memory, Writeback",
        "Decode, Fetch, Writeback, Execute, Memory",
        "Memory, Execute, Fetch, Decode, Writeback"
      ],
      "correctIndex": 1,
      "explanation": "IF, ID, EX, MEM, WB."
    },
    {
      "id": "cs-q113",
      "difficulty": "hard",
      "prompt": "Which SQL clause filters groups?",
      "options": [
        "WHERE",
        "HAVING",
        "ORDER BY",
        "LIMIT"
      ],
      "correctIndex": 1,
      "explanation": "HAVING filters after GROUP BY."
    },
    {
      "id": "cs-q114",
      "difficulty": "hard",
      "prompt": "Normal form removing transitive dependency on non-key attrs?",
      "options": [
        "1NF",
        "2NF",
        "3NF",
        "4NF always same"
      ],
      "correctIndex": 2,
      "explanation": "3NF removes transitive dependencies."
    },
    {
      "id": "cs-q115",
      "difficulty": "hard",
      "prompt": "Which graph representation uses O(V+E) space?",
      "options": [
        "Adjacency matrix always",
        "Adjacency list",
        "Incidence matrix only",
        "Distance matrix only"
      ],
      "correctIndex": 1,
      "explanation": "Adjacency list is O(V+E)."
    },
    {
      "id": "cs-q116",
      "difficulty": "hard",
      "prompt": "Maximum flow problem uses networks with:",
      "options": [
        "Only trees",
        "Capacities on edges",
        "No source/sink",
        "Undirected only"
      ],
      "correctIndex": 1,
      "explanation": "Capacitated directed network."
    },
    {
      "id": "cs-q117",
      "difficulty": "hard",
      "prompt": "Which problem is NP-complete classic?",
      "options": [
        "Sorting",
        "SAT",
        "Binary search",
        "GCD"
      ],
      "correctIndex": 1,
      "explanation": "Boolean satisfiability is NP-complete."
    },
    {
      "id": "cs-q118",
      "difficulty": "hard",
      "prompt": "Optimal binary search tree uses:",
      "options": [
        "Greedy only",
        "Dynamic programming",
        "BFS",
        "DFS only"
      ],
      "correctIndex": 1,
      "explanation": "DP on subtrees."
    },
    {
      "id": "cs-q119",
      "difficulty": "hard",
      "prompt": "Which allocation suffers external fragmentation?",
      "options": [
        "Paging",
        "Contiguous allocation with holes",
        "Stack allocation",
        "Segmentation never"
      ],
      "correctIndex": 1,
      "explanation": "Free holes between allocated blocks."
    },
    {
      "id": "cs-q120",
      "difficulty": "hard",
      "prompt": "Hypervisor Type 1 runs:",
      "options": [
        "Inside a host OS only",
        "Directly on hardware",
        "Only in browsers",
        "Only on GPUs"
      ],
      "correctIndex": 1,
      "explanation": "Bare-metal hypervisor."
    },
    {
      "id": "cs-q121",
      "difficulty": "hard",
      "prompt": "Fully associative cache mapping means:",
      "options": [
        "One block per set",
        "Any block can go to any line",
        "Direct mapped only",
        "No tags"
      ],
      "correctIndex": 1,
      "explanation": "Any block can map to any cache line."
    },
    {
      "id": "cs-q122",
      "difficulty": "hard",
      "prompt": "UDP checksum in IPv4 is:",
      "options": [
        "Optional",
        "Mandatory always",
        "Replaces TCP",
        "Encrypts payload"
      ],
      "correctIndex": 0,
      "explanation": "Optional for IPv4; mandatory IPv6."
    },
    {
      "id": "cs-q123",
      "difficulty": "hard",
      "prompt": "Which sort is O(n) best case on nearly sorted data?",
      "options": [
        "Heapsort",
        "Insertion sort",
        "Merge sort",
        "Quick sort worst"
      ],
      "correctIndex": 1,
      "explanation": "Insertion sort is adaptive."
    },
    {
      "id": "cs-q124",
      "difficulty": "hard",
      "prompt": "Which protocol delivers mail between servers?",
      "options": [
        "POP3",
        "SMTP",
        "HTTP always",
        "FTP"
      ],
      "correctIndex": 1,
      "explanation": "SMTP transfers mail between servers."
    },
    {
      "id": "cs-q125",
      "difficulty": "hard",
      "prompt": "Binary heap efficiently implements:",
      "options": [
        "FIFO queue only",
        "Priority queue",
        "Undo stack only",
        "Graph BFS only"
      ],
      "correctIndex": 1,
      "explanation": "Binary heap for extract-min/max."
    }
  ],
  "puzzles": [
    {
      "id": "puzzles-q16",
      "difficulty": "easy",
      "prompt": "Flip a fair coin three times. P(exactly two heads)?",
      "options": [
        "1/8",
        "1/4",
        "3/8",
        "1/2"
      ],
      "correctIndex": 2,
      "explanation": "C(3,2)/8 = 3/8."
    },
    {
      "id": "puzzles-q17",
      "difficulty": "easy",
      "prompt": "Roll two dice. P(sum is 7)?",
      "options": [
        "1/12",
        "1/6",
        "1/4",
        "5/36"
      ],
      "correctIndex": 1,
      "explanation": "6 favorable outcomes out of 36."
    },
    {
      "id": "puzzles-q18",
      "difficulty": "easy",
      "prompt": "Bag: 3 red, 2 blue. Draw two without replacement. P(both red)?",
      "options": [
        "3/10",
        "6/20",
        "3/20",
        "1/5"
      ],
      "correctIndex": 0,
      "explanation": "(3/5)×(2/4) = 3/10."
    },
    {
      "id": "puzzles-q19",
      "difficulty": "easy",
      "prompt": "Expected value of a fair die roll?",
      "options": [
        "3",
        "3.5",
        "4",
        "4.5"
      ],
      "correctIndex": 1,
      "explanation": "(1+2+3+4+5+6)/6 = 3.5."
    },
    {
      "id": "puzzles-q20",
      "difficulty": "easy",
      "prompt": "Three switches, one bulb in another room. Minimum trips inside?",
      "options": [
        "0",
        "1",
        "2",
        "3"
      ],
      "correctIndex": 1,
      "explanation": "Use heat/on-off pattern; one entry suffices."
    },
    {
      "id": "puzzles-q21",
      "difficulty": "easy",
      "prompt": "12 balls, one different weight. Minimum balance weighings?",
      "options": [
        "2",
        "3",
        "4",
        "5"
      ],
      "correctIndex": 1,
      "explanation": "Three weighings suffice."
    },
    {
      "id": "puzzles-q22",
      "difficulty": "easy",
      "prompt": "Two guards: one lies, one tells truth. One question to find safe door?",
      "options": [
        "Impossible",
        "Ask what other guard would say, then invert",
        "Ask twice",
        "Random"
      ],
      "correctIndex": 1,
      "explanation": "Classic liar/truth-teller strategy."
    },
    {
      "id": "puzzles-q23",
      "difficulty": "easy",
      "prompt": "Burn two 60-min ropes unevenly to measure 45 minutes?",
      "options": [
        "Impossible",
        "Light both ends of A and one end of B; when A dies, light B's other end",
        "Cut both in half",
        "Light one end of both"
      ],
      "correctIndex": 1,
      "explanation": "30 + 15 = 45 minutes."
    },
    {
      "id": "puzzles-q24",
      "difficulty": "easy",
      "prompt": "Measure exactly 4 L with 3 L and 5 L jugs?",
      "options": [
        "No",
        "Yes",
        "Only with 4 L jug",
        "Only with scale"
      ],
      "correctIndex": 1,
      "explanation": "Classic water-jug pour sequence."
    },
    {
      "id": "puzzles-q25",
      "difficulty": "easy",
      "prompt": "Monty Hall after host opens goat: switch wins with probability?",
      "options": [
        "1/3",
        "1/2",
        "2/3",
        "1"
      ],
      "correctIndex": 2,
      "explanation": "Switch wins 2/3 of the time."
    },
    {
      "id": "puzzles-q26",
      "difficulty": "easy",
      "prompt": "Birthday paradox: about how many people for ~50% shared birthday?",
      "options": [
        "12",
        "23",
        "50",
        "100"
      ],
      "correctIndex": 1,
      "explanation": "23 people gives about 50%."
    },
    {
      "id": "puzzles-q27",
      "difficulty": "easy",
      "prompt": "1000 bottles, one poisoned, 10 testers, one round. Minimum testers?",
      "options": [
        "8",
        "9",
        "10",
        "1000"
      ],
      "correctIndex": 2,
      "explanation": "2¹⁰ = 1024 ≥ 1000."
    },
    {
      "id": "puzzles-q28",
      "difficulty": "easy",
      "prompt": "Why are manhole covers round?",
      "options": [
        "Cheaper",
        "Cannot fall through its hole",
        "Fit blocks only",
        "Weigh less"
      ],
      "correctIndex": 1,
      "explanation": "Constant width; square can fall through diagonal."
    },
    {
      "id": "puzzles-q29",
      "difficulty": "easy",
      "prompt": "8 coins, one fake lighter. Minimum balance weighings?",
      "options": [
        "1",
        "2",
        "3",
        "4"
      ],
      "correctIndex": 1,
      "explanation": "Two weighings: split 3-3-2."
    },
    {
      "id": "puzzles-q30",
      "difficulty": "easy",
      "prompt": "Bridge crossing: 1,2,7,10 minutes, two at a time, one torch. Minimum total?",
      "options": [
        "17 min",
        "18 min",
        "19 min",
        "21 min"
      ],
      "correctIndex": 0,
      "explanation": "Optimal strategy total 17 minutes."
    },
    {
      "id": "puzzles-q31",
      "difficulty": "easy",
      "prompt": "100 prisoners, 100 boxes, each opens 50. Loop strategy success rate?",
      "options": [
        "0%",
        "~31%",
        "50%",
        "100%"
      ],
      "correctIndex": 1,
      "explanation": "Loop method ≈31.4%."
    },
    {
      "id": "puzzles-q32",
      "difficulty": "easy",
      "prompt": "Two children, at least one is a boy. P(both boys)?",
      "options": [
        "1/4",
        "1/3",
        "1/2",
        "2/3"
      ],
      "correctIndex": 1,
      "explanation": "BB, BG, GB given ≥1 boy → 1/3."
    },
    {
      "id": "puzzles-q33",
      "difficulty": "easy",
      "prompt": "Three boxes gold-gold, silver-silver, gold-silver. Pick gold coin from random drawer. P(other side gold)?",
      "options": [
        "1/2",
        "1/3",
        "2/3",
        "1"
      ],
      "correctIndex": 2,
      "explanation": "Bertrand's box paradox: 2/3."
    },
    {
      "id": "puzzles-q34",
      "difficulty": "easy",
      "prompt": "100 lockers toggled every nth person. How many open at end?",
      "options": [
        "10",
        "25",
        "50",
        "100"
      ],
      "correctIndex": 0,
      "explanation": "Perfect squares only: 10 open."
    },
    {
      "id": "puzzles-q35",
      "difficulty": "easy",
      "prompt": "River crossing wolf, goat, cabbage. Minimum safe trips?",
      "options": [
        "5",
        "7",
        "9",
        "11"
      ],
      "correctIndex": 1,
      "explanation": "Classic seven-crossing solution."
    },
    {
      "id": "puzzles-q36",
      "difficulty": "easy",
      "prompt": "Mislabeled Apple/Orange/Mixed boxes. One fruit pick fixes all labels. Pick from?",
      "options": [
        "Apple-labeled",
        "Orange-labeled",
        "Mixed-labeled",
        "Any"
      ],
      "correctIndex": 2,
      "explanation": "Mixed-labeled box has only one fruit type."
    },
    {
      "id": "puzzles-q37",
      "difficulty": "easy",
      "prompt": "Break stick at two random points. P(three pieces form triangle)?",
      "options": [
        "1/2",
        "1/3",
        "1/4",
        "1/6"
      ],
      "correctIndex": 2,
      "explanation": "Triangle inequality holds with probability 1/4."
    },
    {
      "id": "puzzles-q38",
      "difficulty": "easy",
      "prompt": "Five pirates split 100 coins; rejected if ≥ half vote no. Pirate 5 proposes. Coins to pirate 4?",
      "options": [
        "0",
        "1",
        "20",
        "50"
      ],
      "correctIndex": 1,
      "explanation": "Backward induction: offer 1 to secure a vote."
    },
    {
      "id": "puzzles-q39",
      "difficulty": "easy",
      "prompt": "Two trains 100 km apart at 50 km/h each. Fly at 100 km/h between them. Distance flown?",
      "options": [
        "50 km",
        "75 km",
        "100 km",
        "200 km"
      ],
      "correctIndex": 2,
      "explanation": "Meet in 1 hour; fly travels 100 km."
    },
    {
      "id": "puzzles-q40",
      "difficulty": "easy",
      "prompt": "Guess 1-100 with higher/lower hints. Worst-case guesses (binary search)?",
      "options": [
        "6",
        "7",
        "8",
        "10"
      ],
      "correctIndex": 1,
      "explanation": "⌈log₂(100)⌉ = 7."
    },
    {
      "id": "puzzles-q41",
      "difficulty": "easy",
      "prompt": "Bag: 1 red, 2 green. Draw 2 without replacement. P(both green)?",
      "options": [
        "1/3",
        "2/3",
        "1/2",
        "1/6"
      ],
      "correctIndex": 0,
      "explanation": "(2/3)(1/2) = 1/3."
    },
    {
      "id": "puzzles-q42",
      "difficulty": "easy",
      "prompt": "Fair coin until first head. Expected flips?",
      "options": [
        "1",
        "1.5",
        "2",
        "4"
      ],
      "correctIndex": 2,
      "explanation": "Geometric mean 1/p = 2."
    },
    {
      "id": "puzzles-q43",
      "difficulty": "easy",
      "prompt": "Party of 10, everyone shakes once. Handshakes?",
      "options": [
        "45",
        "50",
        "90",
        "100"
      ],
      "correctIndex": 0,
      "explanation": "C(10,2)=45."
    },
    {
      "id": "puzzles-q44",
      "difficulty": "easy",
      "prompt": "9 balls, one heavy. Two weighings always enough?",
      "options": [
        "Yes",
        "No",
        "Need three",
        "Impossible"
      ],
      "correctIndex": 0,
      "explanation": "Split 3-3-3 on balance scale."
    },
    {
      "id": "puzzles-q45",
      "difficulty": "easy",
      "prompt": "Rope around Earth +1 m slack. Can a mouse pass under?",
      "options": [
        "No",
        "Yes easily",
        "Only at poles",
        "Need 1 km"
      ],
      "correctIndex": 1,
      "explanation": "Extra slack ≈1/(2π) m height everywhere."
    },
    {
      "id": "puzzles-q46",
      "difficulty": "easy",
      "prompt": "Host opens empty box in 3-box problem. Switching doubles win chance?",
      "options": [
        "No",
        "Yes to 2/3",
        "Stays 1/2",
        "Becomes 1/3"
      ],
      "correctIndex": 1,
      "explanation": "Monty variant: switch wins 2/3."
    },
    {
      "id": "puzzles-q47",
      "difficulty": "easy",
      "prompt": "Coin biased 2/3 heads. Two heads in two flips P?",
      "options": [
        "4/9",
        "2/3",
        "1/2",
        "8/9"
      ],
      "correctIndex": 0,
      "explanation": "(2/3)² = 4/9."
    },
    {
      "id": "puzzles-q48",
      "difficulty": "easy",
      "prompt": "Pick integer 1-100 uniformly. Expected value?",
      "options": [
        "50",
        "50.5",
        "51",
        "49.5"
      ],
      "correctIndex": 1,
      "explanation": "(1+100)/2 = 50.5."
    },
    {
      "id": "puzzles-q49",
      "difficulty": "easy",
      "prompt": "Wason cards E,K,4,7. Rule: vowel→even number. Minimum cards to flip?",
      "options": [
        "1",
        "2",
        "3",
        "4"
      ],
      "correctIndex": 1,
      "explanation": "Flip E and 7."
    },
    {
      "id": "puzzles-q50",
      "difficulty": "easy",
      "prompt": "5 machines make 5 widgets in 5 minutes. 100 machines make 100 widgets in?",
      "options": [
        "5 minutes",
        "100 minutes",
        "20 minutes",
        "1 minute"
      ],
      "correctIndex": 0,
      "explanation": "Rate per machine unchanged: 5 minutes."
    },
    {
      "id": "puzzles-q51",
      "difficulty": "medium",
      "prompt": "Bat and ball cost $1.10. Bat costs $1 more than ball. Ball cost?",
      "options": [
        "$0.10",
        "$0.05",
        "$0.15",
        "$0.50"
      ],
      "correctIndex": 1,
      "explanation": "Ball $0.05, bat $1.05."
    },
    {
      "id": "puzzles-q52",
      "difficulty": "medium",
      "prompt": "Lily pad doubles daily, covers lake in 48 days. Half covered on day?",
      "options": [
        "24",
        "47",
        "46",
        "23"
      ],
      "correctIndex": 1,
      "explanation": "One day before full: day 47."
    },
    {
      "id": "puzzles-q53",
      "difficulty": "medium",
      "prompt": "Snail climbs 3 m/day, slips 2 m/night in 10 m well. Days to escape?",
      "options": [
        "8",
        "9",
        "10",
        "7"
      ],
      "correctIndex": 0,
      "explanation": "Day 8 reaches 10 m without slipping back."
    },
    {
      "id": "puzzles-q54",
      "difficulty": "medium",
      "prompt": "Expected rolls to see all six faces on a die?",
      "options": [
        "6",
        "12",
        "21",
        "36"
      ],
      "correctIndex": 2,
      "explanation": "Coupon collector: 6(1/6+…+1/1)=21."
    },
    {
      "id": "puzzles-q55",
      "difficulty": "medium",
      "prompt": "$30 room, $5 refund, $1 each kept, $2 bellhop. Missing dollar?",
      "options": [
        "Maid",
        "No dollar missing; accounting trick",
        "Manager",
        "Room"
      ],
      "correctIndex": 1,
      "explanation": "Misleading framing; totals balance."
    },
    {
      "id": "puzzles-q56",
      "difficulty": "medium",
      "prompt": "25 horses, 5 tracks, no timer. Minimum races for top 3?",
      "options": [
        "5",
        "6",
        "7",
        "8"
      ],
      "correctIndex": 2,
      "explanation": "7 races suffice."
    },
    {
      "id": "puzzles-q57",
      "difficulty": "medium",
      "prompt": "Two coins total 30 cents, one is not a nickel. What coins?",
      "options": [
        "Two nickels",
        "Quarter and nickel",
        "Dime and quarter",
        "Impossible"
      ],
      "correctIndex": 1,
      "explanation": "Quarter + nickel; one coin is not a nickel."
    },
    {
      "id": "puzzles-q58",
      "difficulty": "medium",
      "prompt": "How many squares on a 4×4 grid?",
      "options": [
        "16",
        "30",
        "34",
        "20"
      ],
      "correctIndex": 1,
      "explanation": "1²+2²+3²+4²=30."
    },
    {
      "id": "puzzles-q59",
      "difficulty": "medium",
      "prompt": "Three ants on triangle corners walk to next corner. Collide or escape?",
      "options": [
        "Always escape",
        "Always collide at center",
        "Random only",
        "Impossible"
      ],
      "correctIndex": 1,
      "explanation": "Symmetric paths meet at centroid unless all same direction."
    },
    {
      "id": "puzzles-q60",
      "difficulty": "medium",
      "prompt": "Flip until HT sequence appears. Expected flips?",
      "options": [
        "3",
        "4",
        "5",
        "6"
      ],
      "correctIndex": 1,
      "explanation": "Expected waiting time for HT is 4."
    },
    {
      "id": "puzzles-q61",
      "difficulty": "medium",
      "prompt": "Flip until HH sequence appears. Expected flips?",
      "options": [
        "3",
        "4",
        "5",
        "6"
      ],
      "correctIndex": 3,
      "explanation": "Expected waiting time for HH is 6."
    },
    {
      "id": "puzzles-q62",
      "difficulty": "medium",
      "prompt": "Water jugs 5 L and 7 L: can you measure 1 L?",
      "options": [
        "Yes",
        "No",
        "Need 3 L jug",
        "Need scale"
      ],
      "correctIndex": 0,
      "explanation": "gcd(5,7)=1 → 1 L measurable."
    },
    {
      "id": "puzzles-q63",
      "difficulty": "medium",
      "prompt": "256 bottles, one poison, 8 testers, one round. Enough?",
      "options": [
        "Yes",
        "No",
        "Need 9",
        "Need 16"
      ],
      "correctIndex": 0,
      "explanation": "2⁸=256."
    },
    {
      "id": "puzzles-q64",
      "difficulty": "medium",
      "prompt": "Blue-eyed islanders: guru says someone has blue eyes. All leave on night?",
      "options": [
        "Never",
        "Night 100",
        "Night 1",
        "Random"
      ],
      "correctIndex": 1,
      "explanation": "Common knowledge triggers cascade on night 100."
    },
    {
      "id": "puzzles-q65",
      "difficulty": "medium",
      "prompt": "Older child is a girl. P(both girls)?",
      "options": [
        "1/4",
        "1/3",
        "1/2",
        "2/3"
      ],
      "correctIndex": 2,
      "explanation": "Given older is girl: GG, GB → 1/2."
    },
    {
      "id": "puzzles-q66",
      "difficulty": "medium",
      "prompt": "Three cards RR, RB, BB. See red face. P(other side red)?",
      "options": [
        "1/2",
        "1/3",
        "2/3",
        "1"
      ],
      "correctIndex": 2,
      "explanation": "Two red faces out of three red-showing sides."
    },
    {
      "id": "puzzles-q67",
      "difficulty": "medium",
      "prompt": "Prisoners box loop strategy overall success?",
      "options": [
        "0%",
        "~31%",
        "50%",
        "100%"
      ],
      "correctIndex": 1,
      "explanation": "Success probability ≈31.4%."
    },
    {
      "id": "puzzles-q68",
      "difficulty": "medium",
      "prompt": "Measure 45 min with 7-min and 11-min hourglasses?",
      "options": [
        "Yes",
        "No",
        "Only 18",
        "Only 22"
      ],
      "correctIndex": 0,
      "explanation": "Possible by flipping at right times."
    },
    {
      "id": "puzzles-q69",
      "difficulty": "medium",
      "prompt": "Expected maximum of two fair dice?",
      "options": [
        "4.47",
        "5",
        "6",
        "7"
      ],
      "correctIndex": 0,
      "explanation": "161/36 ≈ 4.47."
    },
    {
      "id": "puzzles-q70",
      "difficulty": "medium",
      "prompt": "Draw card from deck. P(king or queen)?",
      "options": [
        "2/13",
        "4/13",
        "8/52",
        "1/13"
      ],
      "correctIndex": 0,
      "explanation": "8/52 = 2/13."
    },
    {
      "id": "puzzles-q71",
      "difficulty": "medium",
      "prompt": "Prisoner's dilemma: mutual defection is:",
      "options": [
        "Pareto optimal",
        "Nash equilibrium but not Pareto optimal",
        "Always worst",
        "Impossible"
      ],
      "correctIndex": 1,
      "explanation": "Both defect is NE but worse than mutual cooperate."
    },
    {
      "id": "puzzles-q72",
      "difficulty": "medium",
      "prompt": "Island truth-tellers and liars. Ask 'Are you a liar?' Answer?",
      "options": [
        "Yes always",
        "No always",
        "Depends",
        "Silence"
      ],
      "correctIndex": 1,
      "explanation": "Both truth-teller and liar say no."
    },
    {
      "id": "puzzles-q73",
      "difficulty": "medium",
      "prompt": "You break a stick twice uniformly. P(form triangle)?",
      "options": [
        "1/2",
        "1/3",
        "1/4",
        "1/6"
      ],
      "correctIndex": 2,
      "explanation": "Classic probability 1/4."
    },
    {
      "id": "puzzles-q74",
      "difficulty": "medium",
      "prompt": "Poison wine: 1000 bottles, 10 slaves, one night. Min slaves?",
      "options": [
        "8",
        "9",
        "10",
        "1000"
      ],
      "correctIndex": 2,
      "explanation": "Binary encoding with 10 bits."
    },
    {
      "id": "puzzles-q75",
      "difficulty": "medium",
      "prompt": "Hat line of 3 with 2 colors. Parity strategy guarantees?",
      "options": [
        "0 correct",
        "At least 1 correct",
        "2 correct always",
        "All 3 correct"
      ],
      "correctIndex": 1,
      "explanation": "Standard parity saves all but first."
    },
    {
      "id": "puzzles-q76",
      "difficulty": "medium",
      "prompt": "Two envelopes X and 2X. Open see 10. Switch EV under uniform X?",
      "options": [
        "Always better",
        "Never better",
        "Same expected value",
        "Always double"
      ],
      "correctIndex": 2,
      "explanation": "Without proper prior, switching doesn't help."
    },
    {
      "id": "puzzles-q77",
      "difficulty": "medium",
      "prompt": "Find heavy ball among 12 in 3 weighings?",
      "options": [
        "Always possible",
        "Sometimes",
        "Need 4",
        "Impossible"
      ],
      "correctIndex": 0,
      "explanation": "Classic 12-ball puzzle: 3 weighings suffice."
    },
    {
      "id": "puzzles-q78",
      "difficulty": "medium",
      "prompt": "Expected tosses until first six on die?",
      "options": [
        "6",
        "12",
        "21",
        "36"
      ],
      "correctIndex": 0,
      "explanation": "Geometric with p=1/6: mean 6."
    },
    {
      "id": "puzzles-q79",
      "difficulty": "medium",
      "prompt": "P(sum even with two dice)?",
      "options": [
        "1/4",
        "1/3",
        "1/2",
        "2/3"
      ],
      "correctIndex": 2,
      "explanation": "Half of 36 outcomes have even sum."
    },
    {
      "id": "puzzles-q80",
      "difficulty": "medium",
      "prompt": "Three gods True/False/Random. Identify all in three questions?",
      "options": [
        "Impossible",
        "Possible",
        "Need four",
        "Need one"
      ],
      "correctIndex": 1,
      "explanation": "Classic logic puzzle is solvable."
    },
    {
      "id": "puzzles-q81",
      "difficulty": "medium",
      "prompt": "100 prisoners each open 50 of 100 boxes with names. Best strategy saves all with prob?",
      "options": [
        "0%",
        "~31%",
        "50%",
        "100%"
      ],
      "correctIndex": 1,
      "explanation": "Loop strategy ≈31%."
    },
    {
      "id": "puzzles-q82",
      "difficulty": "medium",
      "prompt": "Farmer fox/chicken/grain river: minimum crossings?",
      "options": [
        "5",
        "7",
        "9",
        "11"
      ],
      "correctIndex": 1,
      "explanation": "Seven safe crossings."
    },
    {
      "id": "puzzles-q83",
      "difficulty": "medium",
      "prompt": "Switch puzzle: bulb warm but off means which switch?",
      "options": [
        "First switch",
        "Second switch",
        "Third switch",
        "Any"
      ],
      "correctIndex": 0,
      "explanation": "First was on long enough to heat, then off."
    },
    {
      "id": "puzzles-q84",
      "difficulty": "medium",
      "prompt": "P(at least one six in four die rolls)?",
      "options": [
        "1/6",
        "1-(5/6)^4",
        "4/6",
        "2/3"
      ],
      "correctIndex": 1,
      "explanation": "Complement: 1 − (5/6)⁴."
    },
    {
      "id": "puzzles-q85",
      "difficulty": "medium",
      "prompt": "Two dice product is odd. P(both ones)?",
      "options": [
        "1/9",
        "1/6",
        "1/3",
        "1/2"
      ],
      "correctIndex": 0,
      "explanation": "Odd product means both odd: P(1,1|both odd)=1/9."
    },
    {
      "id": "puzzles-q86",
      "difficulty": "hard",
      "prompt": "Weigh 13 coins, one fake (lighter or heavier), 3 weighings?",
      "options": [
        "Always find",
        "Never",
        "Need 4",
        "Need 2"
      ],
      "correctIndex": 0,
      "explanation": "Information theory allows 13 with 3 weighings."
    },
    {
      "id": "puzzles-q87",
      "difficulty": "hard",
      "prompt": "Expected flips until TH (tail then head)?",
      "options": [
        "3",
        "4",
        "5",
        "6"
      ],
      "correctIndex": 1,
      "explanation": "Waiting time for TH is 4."
    },
    {
      "id": "puzzles-q88",
      "difficulty": "hard",
      "prompt": "You have 100 coins on table, 10 heads up, blindfolded. Split into two groups with equal heads?",
      "options": [
        "Impossible",
        "Always possible",
        "50-50",
        "Need scale"
      ],
      "correctIndex": 1,
      "explanation": "Take 10 coins, flip them; balances heads."
    },
    {
      "id": "puzzles-q89",
      "difficulty": "hard",
      "prompt": "Burning rope from both ends finishes in 30 min. Two ropes measure 45 min?",
      "options": [
        "Yes",
        "No",
        "Need third",
        "Only 60"
      ],
      "correctIndex": 0,
      "explanation": "30 + 15 strategy."
    },
    {
      "id": "puzzles-q90",
      "difficulty": "hard",
      "prompt": "P(different birthdays for 2 people)?",
      "options": [
        "364/365",
        "1/365",
        "50%",
        "1/2"
      ],
      "correctIndex": 0,
      "explanation": "365/365 × 364/365 = 364/365."
    },
    {
      "id": "puzzles-q91",
      "difficulty": "hard",
      "prompt": "Three switches one bulb: minimum entries to room?",
      "options": [
        "1",
        "2",
        "3",
        "0"
      ],
      "correctIndex": 0,
      "explanation": "Heat/on-off pattern with one entry."
    },
    {
      "id": "puzzles-q92",
      "difficulty": "hard",
      "prompt": "Monty Hall with 100 doors, open 98 goats. Switch wins with?",
      "options": [
        "1/100",
        "1/2",
        "99/100",
        "50/100"
      ],
      "correctIndex": 2,
      "explanation": "Switch wins (n−1)/n of the time."
    },
    {
      "id": "puzzles-q93",
      "difficulty": "hard",
      "prompt": "How many trailing zeros in 100!?",
      "options": [
        "10",
        "20",
        "24",
        "25"
      ],
      "correctIndex": 2,
      "explanation": "Count factors of 5: 24 zeros."
    },
    {
      "id": "puzzles-q94",
      "difficulty": "hard",
      "prompt": "Clock strikes 6 at 6 o'clock taking 5 seconds. Strikes 12 in?",
      "options": [
        "10 s",
        "11 s",
        "12 s",
        "15 s"
      ],
      "correctIndex": 1,
      "explanation": "6 strikes have 5 intervals; 12 strikes have 11 intervals → 11 s."
    },
    {
      "id": "puzzles-q95",
      "difficulty": "hard",
      "prompt": "Divide 10 coins into two piles with equal heads (blind, unknown heads count)?",
      "options": [
        "Impossible",
        "Flip one pile",
        "Take 10 and flip",
        "Random"
      ],
      "correctIndex": 2,
      "explanation": "Take k coins equal to known heads, flip pile."
    },
    {
      "id": "puzzles-q96",
      "difficulty": "hard",
      "prompt": "Two dice, P(product is prime)?",
      "options": [
        "1/12",
        "1/6",
        "1/4",
        "5/36"
      ],
      "correctIndex": 1,
      "explanation": "Prime product requires one die showing 1: 6 cases out of 36."
    },
    {
      "id": "puzzles-q97",
      "difficulty": "hard",
      "prompt": "Expected value of max of three dice?",
      "options": [
        "约3.5",
        "约4.0",
        "约4.96",
        "约5.5"
      ],
      "correctIndex": 2,
      "explanation": "E[max of 3 dice] = 91/18 ≈ 5.06."
    },
    {
      "id": "puzzles-q98",
      "difficulty": "hard",
      "prompt": "You have 3-quart and 8-quart. Can measure 5 quarts?",
      "options": [
        "No",
        "Yes",
        "Only 4",
        "Only 1"
      ],
      "correctIndex": 1,
      "explanation": "Fill 8, pour to 3 twice etc."
    },
    {
      "id": "puzzles-q99",
      "difficulty": "hard",
      "prompt": "100 lights toggled by every nth person. Open lights count?",
      "options": [
        "10",
        "25",
        "50",
        "100"
      ],
      "correctIndex": 0,
      "explanation": "Perfect squares: 10."
    },
    {
      "id": "puzzles-q100",
      "difficulty": "hard",
      "prompt": "Bridge puzzle 1,2,5,10 optimal time?",
      "options": [
        "15",
        "16",
        "17",
        "18"
      ],
      "correctIndex": 2,
      "explanation": "Send 1&2, 1 back, 5&10, 2 back, 1&2 → 17."
    },
    {
      "id": "puzzles-q101",
      "difficulty": "hard",
      "prompt": "P(exactly one head in three flips)?",
      "options": [
        "1/8",
        "1/4",
        "3/8",
        "1/2"
      ],
      "correctIndex": 2,
      "explanation": "C(3,1)/8 = 3/8."
    },
    {
      "id": "puzzles-q102",
      "difficulty": "hard",
      "prompt": "Draw two cards without replacement P(both aces)?",
      "options": [
        "1/13",
        "1/221",
        "1/169",
        "2/13"
      ],
      "correctIndex": 1,
      "explanation": "(4/52)(3/51)=1/221."
    },
    {
      "id": "puzzles-q103",
      "difficulty": "hard",
      "prompt": "Guess number 1-1000 worst-case binary guesses?",
      "options": [
        "9",
        "10",
        "11",
        "12"
      ],
      "correctIndex": 1,
      "explanation": "⌈log₂(1000)⌉ = 10."
    },
    {
      "id": "puzzles-q104",
      "difficulty": "hard",
      "prompt": "Three boxes mislabeled. One pick fixes labels?",
      "options": [
        "Yes",
        "No",
        "Need two picks",
        "Impossible"
      ],
      "correctIndex": 0,
      "explanation": "Pick Mixed-labeled box."
    },
    {
      "id": "puzzles-q105",
      "difficulty": "hard",
      "prompt": "Poisoned bottle puzzle 1000 bottles 10 slaves?",
      "options": [
        "Need 11",
        "10 enough",
        "Need 8",
        "Need 1000"
      ],
      "correctIndex": 1,
      "explanation": "2¹⁰ ≥ 1000."
    },
    {
      "id": "puzzles-q106",
      "difficulty": "hard",
      "prompt": "Expected rolls for first double-six (two dice)?",
      "options": [
        "6",
        "12",
        "36",
        "42"
      ],
      "correctIndex": 2,
      "explanation": "Geometric on p=1/36: mean 36."
    },
    {
      "id": "puzzles-q107",
      "difficulty": "hard",
      "prompt": "Two children, younger is a girl. P(both girls)?",
      "options": [
        "1/4",
        "1/3",
        "1/2",
        "2/3"
      ],
      "correctIndex": 2,
      "explanation": "Given younger is girl: GG, GB → 1/2."
    },
    {
      "id": "puzzles-q108",
      "difficulty": "hard",
      "prompt": "Water 6 and 10 jugs measure 4?",
      "options": [
        "Yes",
        "No",
        "Only 2",
        "Only 8"
      ],
      "correctIndex": 0,
      "explanation": "gcd(6,10)=2; 4 is achievable."
    },
    {
      "id": "puzzles-q109",
      "difficulty": "hard",
      "prompt": "100 prisoners strategy saves all with probability about?",
      "options": [
        "31%",
        "50%",
        "63%",
        "100%"
      ],
      "correctIndex": 0,
      "explanation": "Loop method ≈31%."
    },
    {
      "id": "puzzles-q110",
      "difficulty": "hard",
      "prompt": "Rope around Earth +6 ft slack. Height increase everywhere?",
      "options": [
        "6 ft",
        "≈1 ft",
        "≈1/(2π) ft",
        "0"
      ],
      "correctIndex": 2,
      "explanation": "h = extra/(2π) ≈ 1 ft for 6 ft extra."
    },
    {
      "id": "puzzles-q111",
      "difficulty": "hard",
      "prompt": "5 pirates 100 gold, proposer 5 keeps?",
      "options": [
        "96",
        "97",
        "98",
        "100"
      ],
      "correctIndex": 2,
      "explanation": "Standard backward induction: 98 for pirate 5."
    },
    {
      "id": "puzzles-q112",
      "difficulty": "hard",
      "prompt": "Flip biased coin P(H)=0.6 twice. P(exactly one H)?",
      "options": [
        "0.24",
        "0.36",
        "0.48",
        "0.60"
      ],
      "correctIndex": 2,
      "explanation": "2×0.6×0.4=0.48."
    },
    {
      "id": "puzzles-q113",
      "difficulty": "hard",
      "prompt": "How many ways to climb 4 stairs taking 1 or 2 steps?",
      "options": [
        "3",
        "4",
        "5",
        "8"
      ],
      "correctIndex": 2,
      "explanation": "Fibonacci: 5 ways."
    },
    {
      "id": "puzzles-q114",
      "difficulty": "hard",
      "prompt": "Three ants on triangle, each picks direction. P(no collision)?",
      "options": [
        "0",
        "1/4",
        "1/2",
        "1"
      ],
      "correctIndex": 1,
      "explanation": "All clockwise or all counterclockwise: 2 of 8 outcomes."
    },
    {
      "id": "puzzles-q115",
      "difficulty": "hard",
      "prompt": "Expected value of minimum of two dice?",
      "options": [
        "约1.47",
        "约2.5",
        "约3.5",
        "约4.5"
      ],
      "correctIndex": 1,
      "explanation": "E[min of 2 dice] = 91/36 ≈ 2.53."
    }
  ],
  "algorithms": [
    {
      "id": "algorithms-q21",
      "difficulty": "easy",
      "prompt": "Mergesort worst-case comparisons?",
      "options": [
        "O(n)",
        "O(n log n)",
        "O(n²)",
        "O(2ⁿ)"
      ],
      "correctIndex": 1,
      "explanation": "Always Θ(n log n) comparisons."
    },
    {
      "id": "algorithms-q22",
      "difficulty": "easy",
      "prompt": "Quicksort average-case time?",
      "options": [
        "O(n)",
        "O(n log n)",
        "O(n²)",
        "O(log n)"
      ],
      "correctIndex": 1,
      "explanation": "Good pivots give n log n average."
    },
    {
      "id": "algorithms-q23",
      "difficulty": "easy",
      "prompt": "Heapsort worst-case time?",
      "options": [
        "O(n)",
        "O(n log n)",
        "O(n²)",
        "O(1)"
      ],
      "correctIndex": 1,
      "explanation": "Extract-max n times: O(n log n)."
    },
    {
      "id": "algorithms-q24",
      "difficulty": "easy",
      "prompt": "Insertion sort best case (sorted input)?",
      "options": [
        "O(n)",
        "O(n log n)",
        "O(n²)",
        "O(1)"
      ],
      "correctIndex": 0,
      "explanation": "O(n) comparisons when already sorted."
    },
    {
      "id": "algorithms-q25",
      "difficulty": "easy",
      "prompt": "Selection sort comparisons always?",
      "options": [
        "O(n)",
        "O(n log n)",
        "O(n²)",
        "O(2ⁿ)"
      ],
      "correctIndex": 2,
      "explanation": "Always Θ(n²) comparisons."
    },
    {
      "id": "algorithms-q26",
      "difficulty": "easy",
      "prompt": "Binary search requires input to be:",
      "options": [
        "Random",
        "Sorted",
        "Unique only",
        "A tree"
      ],
      "correctIndex": 1,
      "explanation": "Needs sorted order."
    },
    {
      "id": "algorithms-q27",
      "difficulty": "easy",
      "prompt": "BFS shortest path on unweighted graph?",
      "options": [
        "No",
        "Yes",
        "Only trees",
        "Only DAGs"
      ],
      "correctIndex": 1,
      "explanation": "First visit is shortest in unweighted graphs."
    },
    {
      "id": "algorithms-q28",
      "difficulty": "easy",
      "prompt": "DFS useful for detecting cycles in?",
      "options": [
        "Undirected only",
        "Directed graphs (with back edges)",
        "Sorted arrays",
        "Heaps only"
      ],
      "correctIndex": 1,
      "explanation": "Back edges indicate cycles in directed graphs."
    },
    {
      "id": "algorithms-q29",
      "difficulty": "easy",
      "prompt": "Topological sort exists iff graph is:",
      "options": [
        "Complete",
        "DAG",
        "Bipartite",
        "Connected undirected"
      ],
      "correctIndex": 1,
      "explanation": "Directed acyclic graph."
    },
    {
      "id": "algorithms-q30",
      "difficulty": "easy",
      "prompt": "Dijkstra time with binary heap?",
      "options": [
        "O(V+E)",
        "O((V+E) log V)",
        "O(V²)",
        "O(E log E) only"
      ],
      "correctIndex": 1,
      "explanation": "Standard binary-heap implementation."
    },
    {
      "id": "algorithms-q31",
      "difficulty": "easy",
      "prompt": "Bellman-Ford time complexity?",
      "options": [
        "O(V+E)",
        "O(VE)",
        "O(V log E)",
        "O(E log V)"
      ],
      "correctIndex": 1,
      "explanation": "V−1 relax rounds over all edges."
    },
    {
      "id": "algorithms-q32",
      "difficulty": "easy",
      "prompt": "Floyd-Warshall time?",
      "options": [
        "O(V³)",
        "O(V² log V)",
        "O(VE)",
        "O(V+E)"
      ],
      "correctIndex": 0,
      "explanation": "Triple loop over vertices."
    },
    {
      "id": "algorithms-q33",
      "difficulty": "easy",
      "prompt": "Kruskal dominated step?",
      "options": [
        "BFS",
        "Sorting edges",
        "DFS from root",
        "Heapify all nodes"
      ],
      "correctIndex": 1,
      "explanation": "Sort edges then union-find."
    },
    {
      "id": "algorithms-q34",
      "difficulty": "easy",
      "prompt": "Prim with min-heap time?",
      "options": [
        "O(V+E)",
        "O(E log V)",
        "O(V²)",
        "O(E²)"
      ],
      "correctIndex": 1,
      "explanation": "Similar to Dijkstra with heap."
    },
    {
      "id": "algorithms-q35",
      "difficulty": "easy",
      "prompt": "Union-find without optimizations?",
      "options": [
        "O(1)",
        "O(log n) amortized",
        "O(n) per op worst",
        "O(1) always"
      ],
      "correctIndex": 2,
      "explanation": "Can degrade to linear per operation."
    },
    {
      "id": "algorithms-q36",
      "difficulty": "easy",
      "prompt": "Dynamic programming needs:",
      "options": [
        "Greedy choice always",
        "Optimal substructure and overlapping subproblems",
        "No recursion",
        "Sorted input"
      ],
      "correctIndex": 1,
      "explanation": "Classic DP prerequisites."
    },
    {
      "id": "algorithms-q37",
      "difficulty": "easy",
      "prompt": "0/1 knapsack with DP time?",
      "options": [
        "O(n)",
        "O(nW)",
        "O(W)",
        "O(n²)"
      ],
      "correctIndex": 1,
      "explanation": "Pseudo-polynomial O(nW)."
    },
    {
      "id": "algorithms-q38",
      "difficulty": "easy",
      "prompt": "Longest common subsequence of strings length m,n?",
      "options": [
        "O(m+n)",
        "O(mn)",
        "O(m log n)",
        "O(n²)"
      ],
      "correctIndex": 1,
      "explanation": "Classic 2D DP table."
    },
    {
      "id": "algorithms-q39",
      "difficulty": "easy",
      "prompt": "Edit distance (Levenshtein) DP space can be reduced to:",
      "options": [
        "O(1)",
        "O(min(m,n))",
        "O(mn) only",
        "O(n²)"
      ],
      "correctIndex": 1,
      "explanation": "Only previous row needed."
    },
    {
      "id": "algorithms-q40",
      "difficulty": "easy",
      "prompt": "Coin change counting ways DP base?",
      "options": [
        "ways[0]=1",
        "ways[0]=0",
        "ways[1]=1 always",
        "No base"
      ],
      "correctIndex": 0,
      "explanation": "One way to make sum 0."
    },
    {
      "id": "algorithms-q41",
      "difficulty": "easy",
      "prompt": "Greedy fails for which classic problem?",
      "options": [
        "Huffman coding",
        "0/1 knapsack",
        "Activity selection",
        "Minimum spanning tree"
      ],
      "correctIndex": 1,
      "explanation": "0/1 knapsack needs DP."
    },
    {
      "id": "algorithms-q42",
      "difficulty": "easy",
      "prompt": "Huffman coding is optimal for?",
      "options": [
        "External merge sort",
        "Prefix-free lossless compression",
        "Hashing",
        "Graph coloring"
      ],
      "correctIndex": 1,
      "explanation": "Minimizes expected code length."
    },
    {
      "id": "algorithms-q43",
      "difficulty": "easy",
      "prompt": "Activity selection greedy picks:",
      "options": [
        "Longest activity",
        "Earliest finishing next",
        "Random",
        "Latest start"
      ],
      "correctIndex": 1,
      "explanation": "Earliest finish time first."
    },
    {
      "id": "algorithms-q44",
      "difficulty": "easy",
      "prompt": "Binary search tree search worst-case?",
      "options": [
        "O(log n)",
        "O(n)",
        "O(1)",
        "O(n log n)"
      ],
      "correctIndex": 1,
      "explanation": "Skewed tree is linear."
    },
    {
      "id": "algorithms-q45",
      "difficulty": "easy",
      "prompt": "AVL insert worst-case rotations?",
      "options": [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n log n)"
      ],
      "correctIndex": 1,
      "explanation": "Height is O(log n)."
    },
    {
      "id": "algorithms-q46",
      "difficulty": "easy",
      "prompt": "Red-black insert fixup is:",
      "options": [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n²)"
      ],
      "correctIndex": 1,
      "explanation": "Constant work per level."
    },
    {
      "id": "algorithms-q47",
      "difficulty": "easy",
      "prompt": "B-tree designed for:",
      "options": [
        "CPU L1 cache",
        "Minimizing disk seeks",
        "GPU threads",
        "Sorting networks"
      ],
      "correctIndex": 1,
      "explanation": "High branching factor for disk blocks."
    },
    {
      "id": "algorithms-q48",
      "difficulty": "easy",
      "prompt": "Heap extract-max time?",
      "options": [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n log n)"
      ],
      "correctIndex": 1,
      "explanation": "Down-heapify root."
    },
    {
      "id": "algorithms-q49",
      "difficulty": "easy",
      "prompt": "Build heap with Floyd's heapify?",
      "options": [
        "O(n)",
        "O(n log n)",
        "O(n²)",
        "O(log n)"
      ],
      "correctIndex": 0,
      "explanation": "Linear-time bottom-up heapify."
    },
    {
      "id": "algorithms-q50",
      "difficulty": "easy",
      "prompt": "Counting sort requires?",
      "options": [
        "Comparison only",
        "Known integer range",
        "Sorted input",
        "Stable queue"
      ],
      "correctIndex": 1,
      "explanation": "Range of key values bounded."
    },
    {
      "id": "algorithms-q51",
      "difficulty": "easy",
      "prompt": "Radix sort complexity roughly?",
      "options": [
        "O(n)",
        "O(d(n+k))",
        "O(n log n)",
        "O(n²)"
      ],
      "correctIndex": 1,
      "explanation": "d passes over n digits with k range."
    },
    {
      "id": "algorithms-q52",
      "difficulty": "easy",
      "prompt": "Bucket sort average case with uniform input?",
      "options": [
        "O(n)",
        "O(n log n)",
        "O(n²)",
        "O(log n)"
      ],
      "correctIndex": 0,
      "explanation": "Linear when buckets balanced."
    },
    {
      "id": "algorithms-q53",
      "difficulty": "easy",
      "prompt": "Master theorem applies to:",
      "options": [
        "All recurrences",
        "Divide-and-conquer recurrences of form T(n)=aT(n/b)+f(n)",
        "Graph DFS only",
        "Greedy proofs"
      ],
      "correctIndex": 1,
      "explanation": "Standard divide-and-conquer form."
    },
    {
      "id": "algorithms-q54",
      "difficulty": "easy",
      "prompt": "T(n)=2T(n/2)+n gives?",
      "options": [
        "O(n)",
        "O(n log n)",
        "O(n²)",
        "O(log n)"
      ],
      "correctIndex": 1,
      "explanation": "Case 2: f(n)=Θ(n), log_b a=1."
    },
    {
      "id": "algorithms-q55",
      "difficulty": "easy",
      "prompt": "T(n)=T(n-1)+1 gives?",
      "options": [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n log n)"
      ],
      "correctIndex": 2,
      "explanation": "Linear recursion depth."
    },
    {
      "id": "algorithms-q56",
      "difficulty": "medium",
      "prompt": "Amortized dynamic array append?",
      "options": [
        "O(n)",
        "O(log n)",
        "O(1)",
        "O(n log n)"
      ],
      "correctIndex": 2,
      "explanation": "Doubling strategy amortized constant."
    },
    {
      "id": "algorithms-q57",
      "difficulty": "medium",
      "prompt": "Skip list expected search?",
      "options": [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n log n)"
      ],
      "correctIndex": 1,
      "explanation": "Probabilistic balanced levels."
    },
    {
      "id": "algorithms-q58",
      "difficulty": "medium",
      "prompt": "Hash table worst-case lookup (no safeguards)?",
      "options": [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n log n)"
      ],
      "correctIndex": 2,
      "explanation": "All keys collide into one bucket."
    },
    {
      "id": "algorithms-q59",
      "difficulty": "medium",
      "prompt": "Open addressing load factor must stay:",
      "options": [
        "Above 1",
        "Below 1",
        "Exactly 0.5 always",
        "Unbounded"
      ],
      "correctIndex": 1,
      "explanation": "Need empty slots to probe."
    },
    {
      "id": "algorithms-q60",
      "difficulty": "medium",
      "prompt": "Two-pointer technique common on:",
      "options": [
        "Unsorted arrays only",
        "Sorted arrays for pair problems",
        "Graph cycles",
        "Heaps only"
      ],
      "correctIndex": 1,
      "explanation": "Sorted input enables two pointers."
    },
    {
      "id": "algorithms-q61",
      "difficulty": "medium",
      "prompt": "Sliding window typical complexity?",
      "options": [
        "O(n²)",
        "O(n log n)",
        "O(n)",
        "O(2ⁿ)"
      ],
      "correctIndex": 2,
      "explanation": "Each element enters/leaves once."
    },
    {
      "id": "algorithms-q62",
      "difficulty": "medium",
      "prompt": "Kadane's algorithm finds:",
      "options": [
        "Shortest path",
        "Maximum subarray sum",
        "Minimum spanning tree",
        "Topological order"
      ],
      "correctIndex": 1,
      "explanation": "Linear-time max subarray."
    },
    {
      "id": "algorithms-q63",
      "difficulty": "medium",
      "prompt": "Prefix sums enable range sum query after preprocess in:",
      "options": [
        "O(n) query",
        "O(1) query",
        "O(log n) query",
        "O(n²) query"
      ],
      "correctIndex": 1,
      "explanation": "prefix[r]-prefix[l-1] in O(1)."
    },
    {
      "id": "algorithms-q64",
      "difficulty": "medium",
      "prompt": "Difference array helps with:",
      "options": [
        "Static queries only",
        "Range update + point query",
        "Sorting strings",
        "Graph coloring"
      ],
      "correctIndex": 1,
      "explanation": "Efficient range increment updates."
    },
    {
      "id": "algorithms-q65",
      "difficulty": "medium",
      "prompt": "Monotonic stack often finds:",
      "options": [
        "Shortest path",
        "Next greater element",
        "Minimum spanning tree",
        "Max flow"
      ],
      "correctIndex": 1,
      "explanation": "Classic NGE in linear time."
    },
    {
      "id": "algorithms-q66",
      "difficulty": "medium",
      "prompt": "Binary lifting on trees enables:",
      "options": [
        "O(1) LCA after O(n log n) prep",
        "O(n) LCA always",
        "Only BFS",
        "Only heaps"
      ],
      "correctIndex": 0,
      "explanation": "LCA in O(log n) per query."
    },
    {
      "id": "algorithms-q67",
      "difficulty": "medium",
      "prompt": "Euler tour technique useful for:",
      "options": [
        "Sorting",
        "Subtree queries on trees",
        "Hashing",
        "Flow networks"
      ],
      "correctIndex": 1,
      "explanation": "Flattens subtree to array interval."
    },
    {
      "id": "algorithms-q68",
      "difficulty": "medium",
      "prompt": "Heavy-light decomposition helps:",
      "options": [
        "Sorting",
        "Path queries on trees",
        "String matching only",
        "Convex hull"
      ],
      "correctIndex": 1,
      "explanation": "Decomposes paths into O(log n) chains."
    },
    {
      "id": "algorithms-q69",
      "difficulty": "medium",
      "prompt": "Segment tree range query time?",
      "options": [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n log n)"
      ],
      "correctIndex": 1,
      "explanation": "Split query across O(log n) nodes."
    },
    {
      "id": "algorithms-q70",
      "difficulty": "medium",
      "prompt": "Fenwick tree (BIT) supports?",
      "options": [
        "Only point updates",
        "Point update and prefix sum in O(log n)",
        "Only static arrays",
        "O(1) range update always"
      ],
      "correctIndex": 1,
      "explanation": "Efficient prefix sums."
    },
    {
      "id": "algorithms-q71",
      "difficulty": "medium",
      "prompt": "Trie search for word length L?",
      "options": [
        "O(L)",
        "O(n)",
        "O(log n)",
        "O(nL)"
      ],
      "correctIndex": 0,
      "explanation": "Follow one edge per character."
    },
    {
      "id": "algorithms-q72",
      "difficulty": "medium",
      "prompt": "A* search needs admissible heuristic to guarantee:",
      "options": [
        "Fastest runtime always",
        "Optimal path",
        "No memory use",
        "Polynomial time always"
      ],
      "correctIndex": 1,
      "explanation": "Never overestimates cost to goal."
    },
    {
      "id": "algorithms-q73",
      "difficulty": "medium",
      "prompt": "Branch and bound prunes when:",
      "options": [
        "Node is leaf",
        "Lower bound exceeds best known solution",
        "Graph is tree",
        "Queue empty"
      ],
      "correctIndex": 1,
      "explanation": "Cannot beat incumbent."
    },
    {
      "id": "algorithms-q74",
      "difficulty": "medium",
      "prompt": "Backtracking explores:",
      "options": [
        "Only greedy choices",
        "All possibilities with pruning",
        "Random paths only",
        "Sorted arrays only"
      ],
      "correctIndex": 1,
      "explanation": "Systematic search with cuts."
    },
    {
      "id": "algorithms-q75",
      "difficulty": "medium",
      "prompt": "NP-complete problem means:",
      "options": [
        "In P",
        "In NP and every NP problem reduces to it",
        "Undecidable always",
        "O(n) solvable"
      ],
      "correctIndex": 1,
      "explanation": "Hardest problems in NP (assuming P≠NP)."
    },
    {
      "id": "algorithms-q76",
      "difficulty": "medium",
      "prompt": "Approximation algorithm for vertex cover 2-approx:",
      "options": [
        "Pick random edge",
        "Pick any edge and add both endpoints, repeat",
        "Use DFS only",
        "Sort vertices"
      ],
      "correctIndex": 1,
      "explanation": "Maximal matching gives factor 2."
    },
    {
      "id": "algorithms-q77",
      "difficulty": "medium",
      "prompt": "Stable matching Gale-Shapley is:",
      "options": [
        "O(n)",
        "O(n log n)",
        "O(n²)",
        "O(2ⁿ)"
      ],
      "correctIndex": 2,
      "explanation": "Each proposal potentially scans list."
    },
    {
      "id": "algorithms-q78",
      "difficulty": "medium",
      "prompt": "Reservoir sampling of size k from stream uses:",
      "options": [
        "O(k) memory",
        "O(n) memory always",
        "O(1) memory only",
        "O(n²) time"
      ],
      "correctIndex": 0,
      "explanation": "Keep k samples with proper probabilities."
    },
    {
      "id": "algorithms-q79",
      "difficulty": "medium",
      "prompt": "Boyce-Moore string search worst-case?",
      "options": [
        "O(n)",
        "O(n+m)",
        "O(nm)",
        "O(n log m)"
      ],
      "correctIndex": 2,
      "explanation": "Bad-character/heuristic worst cases exist."
    },
    {
      "id": "algorithms-q80",
      "difficulty": "medium",
      "prompt": "KMP preprocessing failure function is:",
      "options": [
        "O(m)",
        "O(m²)",
        "O(n)",
        "O(n+m)"
      ],
      "correctIndex": 0,
      "explanation": "Linear in pattern length m."
    },
    {
      "id": "algorithms-q81",
      "difficulty": "medium",
      "prompt": "Rabin-Karp rolling hash average search?",
      "options": [
        "O(n+m)",
        "O(nm)",
        "O(n log m)",
        "O(m)"
      ],
      "correctIndex": 0,
      "explanation": "Expected linear with good hash."
    },
    {
      "id": "algorithms-q82",
      "difficulty": "medium",
      "prompt": "Convex hull Graham scan time?",
      "options": [
        "O(n)",
        "O(n log n)",
        "O(n²)",
        "O(log n)"
      ],
      "correctIndex": 1,
      "explanation": "Sort points then scan."
    },
    {
      "id": "algorithms-q83",
      "difficulty": "medium",
      "prompt": "Line sweep for intersection of segments?",
      "options": [
        "O(n)",
        "O(n log n)",
        "O(n²)",
        "O(2ⁿ)"
      ],
      "correctIndex": 1,
      "explanation": "Sort events, active set."
    },
    {
      "id": "algorithms-q84",
      "difficulty": "medium",
      "prompt": "Maximum subarray with divide and conquer?",
      "options": [
        "O(n log n)",
        "O(n)",
        "O(n²)",
        "O(log n)"
      ],
      "correctIndex": 1,
      "explanation": "Cross-midpoint handled in O(n)."
    },
    {
      "id": "algorithms-q85",
      "difficulty": "medium",
      "prompt": "Matrix chain multiplication DP states?",
      "options": [
        "O(n)",
        "O(n²)",
        "O(n³)",
        "O(2ⁿ)"
      ],
      "correctIndex": 1,
      "explanation": "Interval DP over i..j."
    },
    {
      "id": "algorithms-q86",
      "difficulty": "medium",
      "prompt": "Palindrome partitioning min cuts DP?",
      "options": [
        "O(n)",
        "O(n²)",
        "O(n³)",
        "O(2ⁿ)"
      ],
      "correctIndex": 1,
      "explanation": "Check palindrome + DP O(n²)."
    },
    {
      "id": "algorithms-q87",
      "difficulty": "medium",
      "prompt": "Longest increasing subsequence n log n uses:",
      "options": [
        "Sorting",
        "Patience sorting / binary search on tails",
        "Hash table only",
        "BFS"
      ],
      "correctIndex": 1,
      "explanation": "Maintain pile tops."
    },
    {
      "id": "algorithms-q88",
      "difficulty": "medium",
      "prompt": "Graph coloring is NP-hard for general graphs. Greedy order affects:",
      "options": [
        "Nothing",
        "Number of colors used",
        "Whether graph is connected",
        "Edge count only"
      ],
      "correctIndex": 1,
      "explanation": "Order changes greedy color count."
    },
    {
      "id": "algorithms-q89",
      "difficulty": "medium",
      "prompt": "Ford-Fulkerson with integer capacities terminates because:",
      "options": [
        "Flow is always 0",
        "Augmenting path increases flow by ≥1 each time",
        "Graph is a tree",
        "Uses BFS only"
      ],
      "correctIndex": 1,
      "explanation": "Integer increments bound iterations."
    },
    {
      "id": "algorithms-q90",
      "difficulty": "medium",
      "prompt": "Edmonds-Karp chooses augmenting paths by:",
      "options": [
        "Random DFS",
        "BFS shortest path",
        "Dijkstra",
        "Greedy MST"
      ],
      "correctIndex": 1,
      "explanation": "BFS on residual graph."
    },
    {
      "id": "algorithms-q91",
      "difficulty": "hard",
      "prompt": "Min-cut max-flow theorem states:",
      "options": [
        "Cut equals path count",
        "Max flow value equals min s-t cut capacity",
        "Flow always integer",
        "Graph must be tree"
      ],
      "correctIndex": 1,
      "explanation": "Classic max-flow min-cut."
    },
    {
      "id": "algorithms-q92",
      "difficulty": "hard",
      "prompt": "Bipartite matching can be solved via:",
      "options": [
        "Dijkstra",
        "Max flow / Hopcroft-Karp",
        "Quicksort",
        "Kruskal only"
      ],
      "correctIndex": 1,
      "explanation": "Reduce to flow or specialized matching."
    },
    {
      "id": "algorithms-q93",
      "difficulty": "hard",
      "prompt": "Tarjan's SCC algorithm time?",
      "options": [
        "O(V+E)",
        "O(V²)",
        "O(VE)",
        "O(V log V)"
      ],
      "correctIndex": 0,
      "explanation": "One DFS pass with lowlink."
    },
    {
      "id": "algorithms-q94",
      "difficulty": "hard",
      "prompt": "Kosaraju's SCC needs:",
      "options": [
        "One DFS",
        "Two DFS passes",
        "BFS only",
        "Sorting edges"
      ],
      "correctIndex": 1,
      "explanation": "Finish order then transpose DFS."
    },
    {
      "id": "algorithms-q95",
      "difficulty": "hard",
      "prompt": "Johnson's all-pairs shortest paths good for?",
      "options": [
        "Dense graphs only",
        "Sparse graphs with reweighting",
        "Unweighted only",
        "Negative cycles always"
      ],
      "correctIndex": 1,
      "explanation": "Potential reweighting + Dijkstra from each node."
    },
    {
      "id": "algorithms-q96",
      "difficulty": "hard",
      "prompt": "A* with zero heuristic equals:",
      "options": [
        "BFS",
        "Dijkstra-like best-first",
        "Random walk",
        "DFS"
      ],
      "correctIndex": 1,
      "explanation": "Degrades toward uniform-cost search."
    },
    {
      "id": "algorithms-q97",
      "difficulty": "hard",
      "prompt": "Meet-in-the-middle splits problem into:",
      "options": [
        "Two halves searched separately then combined",
        "Three thirds",
        "Random halves",
        "Sorted halves only"
      ],
      "correctIndex": 0,
      "explanation": "Exponential to roughly sqrt exponential."
    },
    {
      "id": "algorithms-q98",
      "difficulty": "hard",
      "prompt": "Mo's algorithm sorts queries by:",
      "options": [
        "Random",
        "Block of left endpoint then right",
        "Only right endpoint",
        "Weight only"
      ],
      "correctIndex": 1,
      "explanation": "Offline sqrt decomposition on queries."
    },
    {
      "id": "algorithms-q99",
      "difficulty": "hard",
      "prompt": "Persistent segment tree allows:",
      "options": [
        "Only point queries",
        "Multiple versions with path copying",
        "O(1) updates always",
        "No extra memory"
      ],
      "correctIndex": 1,
      "explanation": "Functional persistence via copied nodes."
    },
    {
      "id": "algorithms-q100",
      "difficulty": "hard",
      "prompt": "Wavelet tree supports:",
      "options": [
        "Only sums",
        "Rank/select on sequences",
        "Sorting in O(n)",
        "Max flow"
      ],
      "correctIndex": 1,
      "explanation": "Rank queries on alphabets."
    },
    {
      "id": "algorithms-q101",
      "difficulty": "hard",
      "prompt": "Suffix array construction DC3/Skew is:",
      "options": [
        "O(n)",
        "O(n log n)",
        "O(n log² n)",
        "O(n²)"
      ],
      "correctIndex": 0,
      "explanation": "Linear-time algorithms exist."
    },
    {
      "id": "algorithms-q102",
      "difficulty": "hard",
      "prompt": "LCP array with suffix array helps:",
      "options": [
        "Sorting integers",
        "Longest repeated substring problems",
        "Minimum spanning tree",
        "Convex hull"
      ],
      "correctIndex": 1,
      "explanation": "Adjacent suffix LCP properties."
    },
    {
      "id": "algorithms-q103",
      "difficulty": "hard",
      "prompt": "Treap expected height?",
      "options": [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n log n)"
      ],
      "correctIndex": 1,
      "explanation": "Random priorities balance tree."
    },
    {
      "id": "algorithms-q104",
      "difficulty": "hard",
      "prompt": "Splay tree amortized access?",
      "options": [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n log n)"
      ],
      "correctIndex": 1,
      "explanation": "Amortized logarithmic."
    },
    {
      "id": "algorithms-q105",
      "difficulty": "hard",
      "prompt": "Link-cut tree supports:",
      "options": [
        "Static trees only",
        "Dynamic forest path queries/updates",
        "Sorting only",
        "Hashing only"
      ],
      "correctIndex": 1,
      "explanation": "Dynamic trees with splay."
    },
    {
      "id": "algorithms-q106",
      "difficulty": "hard",
      "prompt": "Centroid decomposition depth?",
      "options": [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n log n)"
      ],
      "correctIndex": 1,
      "explanation": "Centroid splits size at least half."
    },
    {
      "id": "algorithms-q107",
      "difficulty": "hard",
      "prompt": "Mo's algorithm typical complexity?",
      "options": [
        "O(n√n)",
        "O(n log n)",
        "O(n²)",
        "O(n)"
      ],
      "correctIndex": 0,
      "explanation": "O((n+q)√n) with sqrt block."
    },
    {
      "id": "algorithms-q108",
      "difficulty": "hard",
      "prompt": "Bitset DP speedup comes from:",
      "options": [
        "More recursion",
        "Word-level parallelism on subsets",
        "Sorting",
        "Heaps"
      ],
      "correctIndex": 1,
      "explanation": "Process 64-bit chunks at once."
    },
    {
      "id": "algorithms-q109",
      "difficulty": "hard",
      "prompt": "Dinic's algorithm on unit capacity networks?",
      "options": [
        "O(E)",
        "O(E√V)",
        "O(VE)",
        "O(V³)"
      ],
      "correctIndex": 1,
      "explanation": "Better on many practical networks."
    },
    {
      "id": "algorithms-q110",
      "difficulty": "hard",
      "prompt": "Hungarian algorithm solves:",
      "options": [
        "Maximum flow",
        "Assignment problem in O(n³)",
        "Traveling salesman exactly",
        "Sorting"
      ],
      "correctIndex": 1,
      "explanation": "Minimum cost bipartite matching."
    },
    {
      "id": "algorithms-q111",
      "difficulty": "hard",
      "prompt": "Simplex is for:",
      "options": [
        "Graph BFS",
        "Linear programming",
        "String matching",
        "Sorting"
      ],
      "correctIndex": 1,
      "explanation": "LP optimization (worst-case exponential)."
    },
    {
      "id": "algorithms-q112",
      "difficulty": "hard",
      "prompt": "Fast Fourier transform multiplies degree-n polynomials in:",
      "options": [
        "O(n)",
        "O(n log n)",
        "O(n²)",
        "O(log n)"
      ],
      "correctIndex": 1,
      "explanation": "O(n log n) convolution."
    },
    {
      "id": "algorithms-q113",
      "difficulty": "hard",
      "prompt": "Karatsuba multiplication beats O(n²) at:",
      "options": [
        "Large n",
        "Small n only",
        "n=2 only",
        "Never"
      ],
      "correctIndex": 0,
      "explanation": "Divide-and-conquer for big integers."
    },
    {
      "id": "algorithms-q114",
      "difficulty": "hard",
      "prompt": "Strassen matrix multiplication is:",
      "options": [
        "O(n²)",
        "O(n^2.807)",
        "O(n³)",
        "O(n log n)"
      ],
      "correctIndex": 1,
      "explanation": "Sub-cubic matrix multiply."
    },
    {
      "id": "algorithms-q115",
      "difficulty": "hard",
      "prompt": "Pollard rho factors integers expected:",
      "options": [
        "O(1)",
        "O(n^1/4) for small factors",
        "O(n)",
        "O(log n)"
      ],
      "correctIndex": 1,
      "explanation": "Probabilistic factorization method."
    },
    {
      "id": "algorithms-q116",
      "difficulty": "hard",
      "prompt": "Miller-Rabin tests primality in:",
      "options": [
        "O(log n) deterministic always",
        "O(k log³ n) probabilistic",
        "O(n)",
        "O(√n)"
      ],
      "correctIndex": 1,
      "explanation": "Polynomial time with error probability."
    },
    {
      "id": "algorithms-q117",
      "difficulty": "hard",
      "prompt": "Sweep line convex hull (Andrew) is:",
      "options": [
        "O(n log n)",
        "O(n)",
        "O(n²)",
        "O(log n)"
      ],
      "correctIndex": 0,
      "explanation": "Sort by x then build upper/lower."
    },
    {
      "id": "algorithms-q118",
      "difficulty": "hard",
      "prompt": "Rotating calipers on convex hull finds:",
      "options": [
        "Shortest path",
        "Diameter in O(n)",
        "Minimum spanning tree",
        "Topological order"
      ],
      "correctIndex": 1,
      "explanation": "Linear after hull construction."
    },
    {
      "id": "algorithms-q119",
      "difficulty": "hard",
      "prompt": "Dancing links (Algorithm X) solves:",
      "options": [
        "Sorting",
        "Exact cover problems",
        "Max flow only",
        "String hash"
      ],
      "correctIndex": 1,
      "explanation": "Knuth's exact cover with DLX."
    },
    {
      "id": "algorithms-q120",
      "difficulty": "hard",
      "prompt": "Simulated annealing is a:",
      "options": [
        "Exact DP",
        "Probabilistic metaheuristic",
        "Graph traversal",
        "Stable sort"
      ],
      "correctIndex": 1,
      "explanation": "Escapes local minima with temperature."
    }
  ],
  "practical": [
    {
      "id": "practical-q21",
      "difficulty": "easy",
      "prompt": "JWT in localStorage is risky mainly because of:",
      "options": [
        "CSS bugs",
        "XSS stealing the token",
        "Slow DNS",
        "Missing alt text"
      ],
      "correctIndex": 1,
      "explanation": "Any script on the page can read localStorage."
    },
    {
      "id": "practical-q22",
      "difficulty": "easy",
      "prompt": "Prevent SQL injection best practice:",
      "options": [
        "String concat with input",
        "Parameterized queries",
        "Disable HTTPS",
        "Client-only validation"
      ],
      "correctIndex": 1,
      "explanation": "Bind values separately from SQL text."
    },
    {
      "id": "practical-q23",
      "difficulty": "easy",
      "prompt": "Browser CORS error on fetch usually means:",
      "options": [
        "Invalid JSON",
        "Server did not allow origin/method/header",
        "TCP disabled",
        "Disk full"
      ],
      "correctIndex": 1,
      "explanation": "Browser enforces Access-Control-* headers."
    },
    {
      "id": "practical-q24",
      "difficulty": "easy",
      "prompt": "HTTP 429 means:",
      "options": [
        "OK",
        "Redirect",
        "Too Many Requests",
        "Not Found"
      ],
      "correctIndex": 2,
      "explanation": "Rate limited."
    },
    {
      "id": "practical-q25",
      "difficulty": "easy",
      "prompt": "Idempotent HTTP method:",
      "options": [
        "POST",
        "PUT",
        "PATCH always",
        "CONNECT"
      ],
      "correctIndex": 1,
      "explanation": "Repeating PUT should leave same state."
    },
    {
      "id": "practical-q26",
      "difficulty": "easy",
      "prompt": "WebSockets beat short polling when you need:",
      "options": [
        "Static file",
        "Low-latency bidirectional updates",
        "SEO HTML only",
        "DNSSEC"
      ],
      "correctIndex": 1,
      "explanation": "Persistent channel vs empty polls."
    },
    {
      "id": "practical-q27",
      "difficulty": "easy",
      "prompt": "Content-Security-Policy helps mitigate:",
      "options": [
        "SQL injection directly",
        "XSS by restricting script sources",
        "Disk failure",
        "Slow queries"
      ],
      "correctIndex": 1,
      "explanation": "Limits where scripts/styles load from."
    },
    {
      "id": "practical-q28",
      "difficulty": "easy",
      "prompt": "HttpOnly cookie flag prevents:",
      "options": [
        "Server reading cookie",
        "JavaScript access to cookie",
        "HTTPS",
        "Caching"
      ],
      "correctIndex": 1,
      "explanation": "document.cookie cannot read it."
    },
    {
      "id": "practical-q29",
      "difficulty": "easy",
      "prompt": "SameSite=Lax cookie mainly mitigates:",
      "options": [
        "XSS",
        "CSRF on cross-site requests",
        "SQL injection",
        "DDoS"
      ],
      "correctIndex": 1,
      "explanation": "Restricts cross-site cookie sending."
    },
    {
      "id": "practical-q30",
      "difficulty": "easy",
      "prompt": "CSRF token defense works because:",
      "options": [
        "It encrypts passwords",
        "Attacker cannot read token on your site to forge requests easily",
        "It disables JS",
        "It replaces HTTPS"
      ],
      "correctIndex": 1,
      "explanation": "Secret token required on state-changing requests."
    },
    {
      "id": "practical-q31",
      "difficulty": "easy",
      "prompt": "bcrypt/scrypt/argon2 are for:",
      "options": [
        "Compression",
        "Password hashing",
        "JSON parsing",
        "Load balancing"
      ],
      "correctIndex": 1,
      "explanation": "Slow password hashing algorithms."
    },
    {
      "id": "practical-q32",
      "difficulty": "easy",
      "prompt": "OAuth 2 authorization code flow with PKCE is for:",
      "options": [
        "Server-only apps",
        "Public clients like SPAs/mobile",
        "Disabling TLS",
        "Caching static assets"
      ],
      "correctIndex": 1,
      "explanation": "PKCE protects public clients without secret."
    },
    {
      "id": "practical-q33",
      "difficulty": "easy",
      "prompt": "Refresh tokens should be stored:",
      "options": [
        "In URL query always",
        "Securely server-side or secure storage; not in logs",
        "In HTML comments",
        "In CSS"
      ],
      "correctIndex": 1,
      "explanation": "Treat as sensitive credentials."
    },
    {
      "id": "practical-q34",
      "difficulty": "easy",
      "prompt": "REST cacheable GET responses use:",
      "options": [
        "POST body",
        "Cache-Control/ETag headers",
        "SQL indexes",
        "WebSockets"
      ],
      "correctIndex": 1,
      "explanation": "HTTP caching headers control reuse."
    },
    {
      "id": "practical-q35",
      "difficulty": "easy",
      "prompt": "HTTP 301 vs 302 for permanent move:",
      "options": [
        "301 permanent",
        "302 permanent",
        "Both temporary",
        "Neither redirects"
      ],
      "correctIndex": 0,
      "explanation": "301 is moved permanently."
    },
    {
      "id": "practical-q36",
      "difficulty": "easy",
      "prompt": "HSTS header purpose:",
      "options": [
        "Compress responses",
        "Force browsers to use HTTPS",
        "Enable CORS",
        "Parse JSON"
      ],
      "correctIndex": 1,
      "explanation": "Strict-Transport-Security upgrades to HTTPS."
    },
    {
      "id": "practical-q37",
      "difficulty": "easy",
      "prompt": "TLS certificate validates:",
      "options": [
        "JSON schema",
        "Server identity (and enables encryption)",
        "Git branch",
        "Docker image tag"
      ],
      "correctIndex": 1,
      "explanation": "PKI binds domain to public key."
    },
    {
      "id": "practical-q38",
      "difficulty": "easy",
      "prompt": "Reverse proxy (nginx) in front of app helps with:",
      "options": [
        "Removing TLS",
        "TLS termination, routing, rate limits",
        "Disabling logs",
        "Running without ports"
      ],
      "correctIndex": 1,
      "explanation": "Edge termination and routing."
    },
    {
      "id": "practical-q39",
      "difficulty": "easy",
      "prompt": "Docker image vs container:",
      "options": [
        "Same thing",
        "Image is template; container is running instance",
        "Container is template",
        "Image is running process only"
      ],
      "correctIndex": 1,
      "explanation": "Image layers vs runnable container."
    },
    {
      "id": "practical-q40",
      "difficulty": "easy",
      "prompt": "Dockerfile CMD vs ENTRYPOINT:",
      "options": [
        "Identical always",
        "ENTRYPOINT sets main executable; CMD default args",
        "CMD cannot be overridden",
        "ENTRYPOINT is only for shell"
      ],
      "correctIndex": 1,
      "explanation": "ENTRYPOINT fixed command, CMD args."
    },
    {
      "id": "practical-q41",
      "difficulty": "easy",
      "prompt": "Kubernetes Pod is:",
      "options": [
        "A VM",
        "Smallest deployable unit sharing network/storage context",
        "Only a container runtime",
        "A load balancer"
      ],
      "correctIndex": 1,
      "explanation": "One or more containers with shared context."
    },
    {
      "id": "practical-q42",
      "difficulty": "easy",
      "prompt": "Kubernetes Deployment manages:",
      "options": [
        "DNS only",
        "Desired state of ReplicaSets/Pods",
        "Physical disks only",
        "TLS certs only"
      ],
      "correctIndex": 1,
      "explanation": "Declarative rollout of pods."
    },
    {
      "id": "practical-q43",
      "difficulty": "easy",
      "prompt": "kubectl apply is:",
      "options": [
        "Destructive delete always",
        "Declarative create/update from manifest",
        "Only logs",
        "Only shell access"
      ],
      "correctIndex": 1,
      "explanation": "Apply desired configuration."
    },
    {
      "id": "practical-q44",
      "difficulty": "easy",
      "prompt": "Git merge vs rebase on feature branch:",
      "options": [
        "Same history always",
        "Merge preserves branch graph; rebase replays commits linearly",
        "Rebase deletes commits",
        "Merge cannot conflict"
      ],
      "correctIndex": 1,
      "explanation": "Different history shapes."
    },
    {
      "id": "practical-q45",
      "difficulty": "easy",
      "prompt": "git revert vs reset:",
      "options": [
        "Same",
        "Revert creates new commit undoing changes; reset moves HEAD",
        "Reset always pushes",
        "Revert deletes history"
      ],
      "correctIndex": 1,
      "explanation": "Revert is safe for shared history."
    },
    {
      "id": "practical-q46",
      "difficulty": "easy",
      "prompt": "Interactive rebase useful to:",
      "options": [
        "Delete remote",
        "Squash/edit commits before sharing",
        "Disable hooks",
        "Skip CI"
      ],
      "correctIndex": 1,
      "explanation": "Clean up local commit history."
    },
    {
      "id": "practical-q47",
      "difficulty": "easy",
      "prompt": "Git cherry-pick applies:",
      "options": [
        "Whole branch merge only",
        "Specific commit(s) onto current branch",
        "Only tags",
        "Only stashes"
      ],
      "correctIndex": 1,
      "explanation": "Replay chosen commit patch."
    },
    {
      "id": "practical-q48",
      "difficulty": "easy",
      "prompt": "Git bisect helps:",
      "options": [
        "Format code",
        "Find commit that introduced bug",
        "Create tags",
        "Push force"
      ],
      "correctIndex": 1,
      "explanation": "Binary search through history."
    },
    {
      "id": "practical-q49",
      "difficulty": "easy",
      "prompt": ".gitignore prevents:",
      "options": [
        "All secrets automatically",
        "Tracking specified files in repo",
        "Pushing branches",
        "Merging"
      ],
      "correctIndex": 1,
      "explanation": "Untracked/ignored paths not added."
    },
    {
      "id": "practical-q50",
      "difficulty": "easy",
      "prompt": "Semantic versioning MAJOR bump means:",
      "options": [
        "Bug fix only",
        "Breaking API change",
        "Documentation only",
        "Patch security"
      ],
      "correctIndex": 0,
      "explanation": "Breaking incompatible changes."
    },
    {
      "id": "practical-q51",
      "difficulty": "easy",
      "prompt": "npm ci vs npm install:",
      "options": [
        "Identical",
        "ci uses package-lock exactly for clean reproducible install",
        "ci ignores lockfile",
        "install never uses lock"
      ],
      "correctIndex": 1,
      "explanation": "ci for CI: strict lockfile install."
    },
    {
      "id": "practical-q52",
      "difficulty": "easy",
      "prompt": "package-lock.json purpose:",
      "options": [
        "Replace package.json",
        "Pin exact dependency tree for reproducibility",
        "Store secrets",
        "Configure ESLint"
      ],
      "correctIndex": 1,
      "explanation": "Locks resolved versions."
    },
    {
      "id": "practical-q53",
      "difficulty": "easy",
      "prompt": "ESM import vs CommonJS require:",
      "options": [
        "Same in Node always",
        "ESM static import/export; CJS require/module.exports",
        "ESM only in browsers",
        "CJS is standard in browsers natively"
      ],
      "correctIndex": 1,
      "explanation": "Different module systems."
    },
    {
      "id": "practical-q54",
      "difficulty": "easy",
      "prompt": "Tree shaking removes:",
      "options": [
        "All bugs",
        "Unused exports in bundled ESM",
        "Git history",
        "Docker layers"
      ],
      "correctIndex": 1,
      "explanation": "Dead code elimination in bundles."
    },
    {
      "id": "practical-q55",
      "difficulty": "easy",
      "prompt": "Source maps help:",
      "options": [
        "Minify CSS only",
        "Debug minified JS in browser devtools",
        "Disable HTTPS",
        "Run SQL"
      ],
      "correctIndex": 1,
      "explanation": "Map compiled code to sources."
    },
    {
      "id": "practical-q56",
      "difficulty": "medium",
      "prompt": "React key prop in lists helps:",
      "options": [
        "Style colors",
        "Stable identity for efficient reconciliation",
        "Disable hooks",
        "Skip rendering"
      ],
      "correctIndex": 1,
      "explanation": "Helps diff list items correctly."
    },
    {
      "id": "practical-q57",
      "difficulty": "medium",
      "prompt": "useEffect dependency array empty [] means:",
      "options": [
        "Run every render",
        "Run once after mount (and cleanup on unmount)",
        "Never run",
        "Run only on unmount"
      ],
      "correctIndex": 1,
      "explanation": "Mount/unmount lifecycle effect."
    },
    {
      "id": "practical-q58",
      "difficulty": "medium",
      "prompt": "Virtual DOM benefit:",
      "options": [
        "Eliminates DOM entirely",
        "Batch/minimize actual DOM updates",
        "Removes JS",
        "Disables events"
      ],
      "correctIndex": 1,
      "explanation": "Efficient UI updates via diffing."
    },
    {
      "id": "practical-q59",
      "difficulty": "medium",
      "prompt": "SSR vs CSR main tradeoff:",
      "options": [
        "SSR never uses JS",
        "SSR sends rendered HTML; better first paint/SEO often",
        "CSR always faster TTFB",
        "Identical SEO"
      ],
      "correctIndex": 1,
      "explanation": "SSR improves initial load/SEO tradeoffs."
    },
    {
      "id": "practical-q60",
      "difficulty": "medium",
      "prompt": "Hydration in SSR frameworks means:",
      "options": [
        "Deleting server HTML",
        "Attaching client JS to server-rendered HTML",
        "Only CSS loading",
        "Database migration"
      ],
      "correctIndex": 1,
      "explanation": "Client takes over static markup."
    },
    {
      "id": "practical-q61",
      "difficulty": "medium",
      "prompt": "API pagination cursor vs offset:",
      "options": [
        "Same",
        "Cursor stable for live data; offset can skip/duplicate",
        "Offset always faster at depth",
        "Cursor returns all rows"
      ],
      "correctIndex": 1,
      "explanation": "Cursor avoids large OFFSET cost/issues."
    },
    {
      "id": "practical-q62",
      "difficulty": "medium",
      "prompt": "Idempotency-Key header used to:",
      "options": [
        "Encrypt body",
        "Safely retry POST without duplicate side effects",
        "Enable CORS",
        "Cache GET forever"
      ],
      "correctIndex": 1,
      "explanation": "Dedup retried writes."
    },
    {
      "id": "practical-q63",
      "difficulty": "medium",
      "prompt": "OpenAPI/Swagger describes:",
      "options": [
        "Kernel drivers",
        "HTTP API contract",
        "Git hooks",
        "CPU pins"
      ],
      "correctIndex": 1,
      "explanation": "Machine-readable API spec."
    },
    {
      "id": "practical-q64",
      "difficulty": "medium",
      "prompt": "GraphQL vs REST typical difference:",
      "options": [
        "GraphQL has no server",
        "Client selects fields/shape in one endpoint",
        "REST cannot cache",
        "GraphQL only for SQL"
      ],
      "correctIndex": 1,
      "explanation": "Flexible queries vs resource endpoints."
    },
    {
      "id": "practical-q65",
      "difficulty": "medium",
      "prompt": "gRPC commonly uses:",
      "options": [
        "HTML forms",
        "HTTP/2 and Protocol Buffers",
        "FTP",
        "SMTP"
      ],
      "correctIndex": 1,
      "explanation": "Binary protobuf over HTTP/2."
    },
    {
      "id": "practical-q66",
      "difficulty": "medium",
      "prompt": "Webhook delivery should verify:",
      "options": [
        "User agent only",
        "Signature (e.g., HMAC) of payload",
        "CSS hash",
        "Git SHA only"
      ],
      "correctIndex": 1,
      "explanation": "Verify sender with shared secret/signature."
    },
    {
      "id": "practical-q67",
      "difficulty": "medium",
      "prompt": "Rate limiting token bucket allows:",
      "options": [
        "Infinite burst always",
        "Controlled burst while averaging rate",
        "No bursts ever",
        "Only daily limits"
      ],
      "correctIndex": 1,
      "explanation": "Burst capacity with refill rate."
    },
    {
      "id": "practical-q68",
      "difficulty": "medium",
      "prompt": "Circuit breaker pattern prevents:",
      "options": [
        "All errors",
        "Cascading failures by failing fast when downstream unhealthy",
        "Caching",
        "Logging"
      ],
      "correctIndex": 1,
      "explanation": "Stop hammering failing service."
    },
    {
      "id": "practical-q69",
      "difficulty": "medium",
      "prompt": "Health check endpoint should reflect:",
      "options": [
        "Only process up",
        "Dependencies critical to serving traffic",
        "Git version only",
        "Random number"
      ],
      "correctIndex": 1,
      "explanation": "Liveness/readiness of real dependencies."
    },
    {
      "id": "practical-q70",
      "difficulty": "medium",
      "prompt": "Blue-green deployment reduces:",
      "options": [
        "Need for tests",
        "Downtime by switching traffic between two environments",
        "Security",
        "Logs"
      ],
      "correctIndex": 1,
      "explanation": "Instant cutover after validation."
    },
    {
      "id": "practical-q71",
      "difficulty": "medium",
      "prompt": "Canary release:",
      "options": [
        "Deploy to all users at once",
        "Roll out to small subset first",
        "Delete old version first always",
        "Disable monitoring"
      ],
      "correctIndex": 1,
      "explanation": "Gradual exposure limits blast radius."
    },
    {
      "id": "practical-q72",
      "difficulty": "medium",
      "prompt": "Infrastructure as Code (Terraform) benefits:",
      "options": [
        "Manual clicks only",
        "Reproducible, versioned infrastructure",
        "Removes need for cloud",
        "Eliminates state"
      ],
      "correctIndex": 1,
      "explanation": "Declarative infra with state tracking."
    },
    {
      "id": "practical-q73",
      "difficulty": "medium",
      "prompt": "CI pipeline lint stage catches:",
      "options": [
        "Hardware faults",
        "Style/errors before tests/build",
        "DNS issues always",
        "User passwords"
      ],
      "correctIndex": 1,
      "explanation": "Static checks early in pipeline."
    },
    {
      "id": "practical-q74",
      "difficulty": "medium",
      "prompt": "Artifact in CI/CD is:",
      "options": [
        "A bug",
        "Built output stored between stages (jar, image, bundle)",
        "Git commit message",
        "SSH key"
      ],
      "correctIndex": 1,
      "explanation": "Immutable build result passed along."
    },
    {
      "id": "practical-q75",
      "difficulty": "medium",
      "prompt": "Secrets in CI should be:",
      "options": [
        "Plain text in repo",
        "Stored in CI secret store/env, not committed",
        "In Dockerfile ARG defaults",
        "Logged verbosely"
      ],
      "correctIndex": 1,
      "explanation": "Never commit credentials."
    },
    {
      "id": "practical-q76",
      "difficulty": "medium",
      "prompt": "Docker multi-stage build helps:",
      "options": [
        "Increase image size",
        "Smaller final image by separating build/runtime",
        "Disable caching",
        "Remove ENTRYPOINT"
      ],
      "correctIndex": 1,
      "explanation": "Drop build tools from final image."
    },
    {
      "id": "practical-q77",
      "difficulty": "medium",
      "prompt": "docker-compose networks allow:",
      "options": [
        "Only one container",
        "Service DNS names on shared network",
        "No isolation",
        "Only host networking always"
      ],
      "correctIndex": 1,
      "explanation": "Containers resolve service names."
    },
    {
      "id": "practical-q78",
      "difficulty": "medium",
      "prompt": "ENV in Dockerfile sets:",
      "options": [
        "Only build-time vars always",
        "Default environment variables in container",
        "Git config",
        "Kubernetes namespace"
      ],
      "correctIndex": 1,
      "explanation": "Available at runtime unless overridden."
    },
    {
      "id": "practical-q79",
      "difficulty": "medium",
      "prompt": "HEALTHCHECK in Dockerfile:",
      "options": [
        "Replaces k8s probes always",
        "Docker-level container health command",
        "Installs npm",
        "Sets CMD"
      ],
      "correctIndex": 1,
      "explanation": "Docker can mark container unhealthy."
    },
    {
      "id": "practical-q80",
      "difficulty": "medium",
      "prompt": "nginx try_files often used to:",
      "options": [
        "Run Python",
        "Serve SPA fallback to index.html",
        "Enable WebSockets only",
        "Compile TypeScript"
      ],
      "correctIndex": 1,
      "explanation": "Client-side routing fallback."
    },
    {
      "id": "practical-q81",
      "difficulty": "medium",
      "prompt": "Load balancer round robin:",
      "options": [
        "Sticky sessions always",
        "Distributes requests sequentially across backends",
        "Sorts by latency only",
        "Encrypts payloads"
      ],
      "correctIndex": 1,
      "explanation": "Simple cyclic distribution."
    },
    {
      "id": "practical-q82",
      "difficulty": "medium",
      "prompt": "Sticky sessions (session affinity) can cause:",
      "options": [
        "Perfect balance always",
        "Uneven load if sessions skew",
        "No cookies ever",
        "Disable TLS"
      ],
      "correctIndex": 1,
      "explanation": "Hot spots if many users one server."
    },
    {
      "id": "practical-q83",
      "difficulty": "medium",
      "prompt": "Redis often used for:",
      "options": [
        "Permanent archive only",
        "Cache, pub/sub, session store",
        "Replacing PostgreSQL always",
        "Compiling code"
      ],
      "correctIndex": 1,
      "explanation": "In-memory data structure server uses."
    },
    {
      "id": "practical-q84",
      "difficulty": "medium",
      "prompt": "Database connection pool purpose:",
      "options": [
        "Slow down app",
        "Reuse connections, avoid connect overhead",
        "Disable transactions",
        "Remove indexes"
      ],
      "correctIndex": 1,
      "explanation": "Amortize expensive connects."
    },
    {
      "id": "practical-q85",
      "difficulty": "medium",
      "prompt": "Migration tool (Flyway/Liquibase) tracks:",
      "options": [
        "CSS versions",
        "Applied schema changes versioned",
        "Git branches",
        "Docker tags"
      ],
      "correctIndex": 1,
      "explanation": "Ordered DB schema migrations."
    },
    {
      "id": "practical-q86",
      "difficulty": "medium",
      "prompt": "Read replica helps:",
      "options": [
        "Primary writes only",
        "Scale read traffic off primary",
        "Eliminate replication lag always",
        "Replace backups"
      ],
      "correctIndex": 1,
      "explanation": "Offload SELECT queries."
    },
    {
      "id": "practical-q87",
      "difficulty": "medium",
      "prompt": "CAP in microservices: during partition you often choose:",
      "options": [
        "Both C and A",
        "Consistency or availability",
        "Neither",
        "Only compression"
      ],
      "correctIndex": 1,
      "explanation": "Tradeoff under network split."
    },
    {
      "id": "practical-q88",
      "difficulty": "medium",
      "prompt": "Message queue (RabbitMQ/Kafka) decouples:",
      "options": [
        "CSS from HTML",
        "Producers and consumers in time/scale",
        "TLS from HTTP",
        "Git from GitHub"
      ],
      "correctIndex": 1,
      "explanation": "Async buffering between services."
    },
    {
      "id": "practical-q89",
      "difficulty": "medium",
      "prompt": "Kafka partitions enable:",
      "options": [
        "Single-thread only",
        "Parallelism and ordering per partition key",
        "Deleting topics automatically",
        "SQL joins"
      ],
      "correctIndex": 1,
      "explanation": "Scale consumers with partition keys."
    },
    {
      "id": "practical-q90",
      "difficulty": "medium",
      "prompt": "Dead letter queue holds:",
      "options": [
        "Successful messages",
        "Messages that failed processing repeatedly",
        "TLS certs",
        "Docker logs"
      ],
      "correctIndex": 1,
      "explanation": "Poison messages for inspection."
    },
    {
      "id": "practical-q91",
      "difficulty": "hard",
      "prompt": "Structured logging (JSON) helps:",
      "options": [
        "Remove timestamps",
        "Machine parsing/search in observability tools",
        "Disable metrics",
        "Hide errors"
      ],
      "correctIndex": 1,
      "explanation": "Query logs in ELK/Datadog etc."
    },
    {
      "id": "practical-q92",
      "difficulty": "hard",
      "prompt": "OpenTelemetry provides:",
      "options": [
        "CSS framework",
        "Unified traces/metrics/logs instrumentation",
        "Git hosting",
        "Package manager"
      ],
      "correctIndex": 1,
      "explanation": "Observability standard APIs."
    },
    {
      "id": "practical-q93",
      "difficulty": "hard",
      "prompt": "Prometheus pull model means:",
      "options": [
        "Apps push all metrics always",
        "Scraper pulls metrics from exporters/targets",
        "No time series",
        "Only logs"
      ],
      "correctIndex": 1,
      "explanation": "Server scrapes /metrics endpoints."
    },
    {
      "id": "practical-q94",
      "difficulty": "hard",
      "prompt": "Alert fatigue best reduced by:",
      "options": [
        "Alert on everything",
        "Actionable alerts with SLOs/thresholds",
        "Disable monitoring",
        "Email each log line"
      ],
      "correctIndex": 1,
      "explanation": "Alert on symptoms that need human action."
    },
    {
      "id": "practical-q95",
      "difficulty": "hard",
      "prompt": "S3 object storage consistency model (read after write new objects)?",
      "options": [
        "Never consistent",
        "Read-after-write for new PUTs",
        "Only eventual for all ops always",
        "Linearizable always"
      ],
      "correctIndex": 1,
      "explanation": "New objects strongly readable; overwrites vary."
    },
    {
      "id": "practical-q96",
      "difficulty": "hard",
      "prompt": "IAM least privilege means:",
      "options": [
        "Admin for all",
        "Grant minimum permissions needed",
        "Share root keys",
        "Disable MFA"
      ],
      "correctIndex": 1,
      "explanation": "Reduce blast radius of credentials."
    },
    {
      "id": "practical-q97",
      "difficulty": "hard",
      "prompt": "X-Forwarded-For header used behind proxy to:",
      "options": [
        "Encrypt traffic",
        "Record original client IP",
        "Set cookies",
        "Disable HTTPS"
      ],
      "correctIndex": 1,
      "explanation": "Pass client IP through proxy chain."
    },
    {
      "id": "practical-q98",
      "difficulty": "hard",
      "prompt": "Double submit cookie pattern mitigates:",
      "options": [
        "XSS only",
        "CSRF by requiring cookie+header token match",
        "SQL injection",
        "DDoS"
      ],
      "correctIndex": 1,
      "explanation": "Attacker cannot read cookie to set header cross-site."
    },
    {
      "id": "practical-q99",
      "difficulty": "hard",
      "prompt": "Subresource Integrity (SRI) on script tags:",
      "options": [
        "Blocks CORS",
        "Verifies CDN file hash matches expected",
        "Enables HTTP",
        "Removes CSP"
      ],
      "correctIndex": 1,
      "explanation": "Tamper detection for third-party scripts."
    },
    {
      "id": "practical-q100",
      "difficulty": "hard",
      "prompt": "Feature flags allow:",
      "options": [
        "Removing tests",
        "Gradual rollout/kill switch without redeploy",
        "Disabling TLS",
        "Skipping code review"
      ],
      "correctIndex": 1,
      "explanation": "Runtime toggles for features."
    },
    {
      "id": "practical-q101",
      "difficulty": "hard",
      "prompt": "12-factor app config stored in:",
      "options": [
        "Source repo secrets",
        "Environment variables",
        "Compiled binary only",
        "CSS files"
      ],
      "correctIndex": 1,
      "explanation": "Config from env, not code."
    },
    {
      "id": "practical-q102",
      "difficulty": "hard",
      "prompt": "Horizontal scaling means:",
      "options": [
        "Bigger CPU only",
        "Add more instances",
        "More RAM on one box only",
        "Disable load balancer"
      ],
      "correctIndex": 1,
      "explanation": "Scale out with more nodes."
    },
    {
      "id": "practical-q103",
      "difficulty": "hard",
      "prompt": "Vertical scaling means:",
      "options": [
        "More servers",
        "Bigger/more powerful single machine",
        "Sharding only",
        "CDN only"
      ],
      "correctIndex": 1,
      "explanation": "Scale up hardware on one host."
    },
    {
      "id": "practical-q104",
      "difficulty": "hard",
      "prompt": "CDN primarily improves:",
      "options": [
        "Database writes",
        "Latency/bandwidth for static/edge-cached content",
        "Git merges",
        "Unit tests"
      ],
      "correctIndex": 1,
      "explanation": "Edge caching closer to users."
    },
    {
      "id": "practical-q105",
      "difficulty": "hard",
      "prompt": "Cache stampede mitigated by:",
      "options": [
        "Never expiring keys",
        "Probabilistic early expiration/locking",
        "Deleting cache",
        "Disabling TTL"
      ],
      "correctIndex": 1,
      "explanation": "Prevent thundering herd on expiry."
    },
    {
      "id": "practical-q106",
      "difficulty": "hard",
      "prompt": "ETag header enables:",
      "options": [
        "SQL injection",
        "Conditional GET with If-None-Match",
        "WebSockets",
        "OAuth"
      ],
      "correctIndex": 1,
      "explanation": "304 Not Modified when unchanged."
    },
    {
      "id": "practical-q107",
      "difficulty": "hard",
      "prompt": "HTTP/2 multiplexing:",
      "options": [
        "One request at a time",
        "Multiple streams over single connection",
        "Replaces TLS",
        "Disables headers"
      ],
      "correctIndex": 1,
      "explanation": "Parallel requests on one TCP conn."
    },
    {
      "id": "practical-q108",
      "difficulty": "hard",
      "prompt": "Server-sent events (SSE) are:",
      "options": [
        "Bidirectional binary only",
        "Server push over HTTP one-way stream",
        "Replacement for WebSockets always",
        "UDP only"
      ],
      "correctIndex": 1,
      "explanation": "Text event stream from server."
    },
    {
      "id": "practical-q109",
      "difficulty": "hard",
      "prompt": "WebSocket handshake starts as:",
      "options": [
        "UDP packet",
        "HTTP Upgrade request",
        "FTP command",
        "SMTP"
      ],
      "correctIndex": 1,
      "explanation": "HTTP Upgrade to WebSocket."
    },
    {
      "id": "practical-q110",
      "difficulty": "hard",
      "prompt": "MIME type application/json indicates:",
      "options": [
        "HTML page",
        "JSON payload",
        "Image/png",
        "Form data"
      ],
      "correctIndex": 1,
      "explanation": "JSON content type."
    },
    {
      "id": "practical-q111",
      "difficulty": "hard",
      "prompt": "multipart/form-data used for:",
      "options": [
        "JSON APIs always",
        "File uploads and form fields",
        "WebSockets",
        "DNS"
      ],
      "correctIndex": 1,
      "explanation": "Encoding files in HTTP forms."
    },
    {
      "id": "practical-q112",
      "difficulty": "hard",
      "prompt": "CORS preflight is triggered by:",
      "options": [
        "Simple GET only",
        "Non-simple methods/headers cross-origin",
        "Same-origin fetch",
        "Static CSS"
      ],
      "correctIndex": 1,
      "explanation": "OPTIONS request for non-simple CORS."
    },
    {
      "id": "practical-q113",
      "difficulty": "hard",
      "prompt": "Access-Control-Allow-Origin: * with credentials:",
      "options": [
        "Allowed",
        "Not allowed together",
        "Required",
        "Ignores CORS"
      ],
      "correctIndex": 1,
      "explanation": "Credentials need explicit origin, not wildcard."
    },
    {
      "id": "practical-q114",
      "difficulty": "hard",
      "prompt": "SQL EXPLAIN helps:",
      "options": [
        "Encrypt data",
        "Analyze query plan/index usage",
        "Deploy Docker",
        "Run tests"
      ],
      "correctIndex": 1,
      "explanation": "See how database executes query."
    },
    {
      "id": "practical-q115",
      "difficulty": "hard",
      "prompt": "N+1 query problem fixed by:",
      "options": [
        "More N+1 loops",
        "Eager loading/batching",
        "Disabling indexes",
        "Using SELECT *"
      ],
      "correctIndex": 1,
      "explanation": "Fetch related data in fewer queries."
    },
    {
      "id": "practical-q116",
      "difficulty": "hard",
      "prompt": "Optimistic locking uses:",
      "options": [
        "Table locks always",
        "Version column/check on update",
        "Deleting rows",
        "Random sleeps"
      ],
      "correctIndex": 1,
      "explanation": "Detect concurrent updates via version."
    },
    {
      "id": "practical-q117",
      "difficulty": "hard",
      "prompt": "Pessimistic locking:",
      "options": [
        "No locks",
        "Locks rows during transaction",
        "Only in Redis",
        "Only for GET"
      ],
      "correctIndex": 1,
      "explanation": "SELECT FOR UPDATE style locks."
    },
    {
      "id": "practical-q118",
      "difficulty": "hard",
      "prompt": "Event sourcing stores:",
      "options": [
        "Only latest state",
        "Sequence of events to reconstruct state",
        "CSS files",
        "Docker layers"
      ],
      "correctIndex": 1,
      "explanation": "Append-only event log as source of truth."
    },
    {
      "id": "practical-q119",
      "difficulty": "hard",
      "prompt": "CQRS separates:",
      "options": [
        "HTML and CSS",
        "Command writes from query reads",
        "TCP and UDP",
        "Git and GitHub"
      ],
      "correctIndex": 1,
      "explanation": "Different models for read vs write."
    },
    {
      "id": "practical-q120",
      "difficulty": "hard",
      "prompt": "Zero-downtime deploy often needs:",
      "options": [
        "Kill all connections instantly",
        "Graceful shutdown + health checks + rolling update",
        "Skip tests",
        "Single server only"
      ],
      "correctIndex": 1,
      "explanation": "Drain connections while shifting traffic."
    }
  ]
}

def validate_question(question: dict, existing_ids: set[str]) -> None:
    qid = question["id"]
    if qid in existing_ids:
        raise ValueError(f"Duplicate id: {qid}")
    if question["difficulty"] not in {"easy", "medium", "hard"}:
        raise ValueError(f"{qid}: invalid difficulty")
    options = question["options"]
    if not isinstance(options, list) or len(options) != 4:
        raise ValueError(f"{qid}: needs exactly 4 options")
    ci = question["correctIndex"]
    if not isinstance(ci, int) or ci < 0 or ci >= len(options):
        raise ValueError(f"{qid}: correctIndex out of range")
    for field in ("prompt", "explanation"):
        if not isinstance(question[field], str) or not question[field].strip():
            raise ValueError(f"{qid}: missing {field}")


def append_to_bank(category: str, new_questions: list[dict]) -> int:
    config = BANK_CONFIG[category]
    path = BANK_DIR / config["file"]
    bank = json.loads(path.read_text(encoding="utf-8"))
    if bank.get("category") != config["category"]:
        raise ValueError(f"Category mismatch in {path}")

    existing_ids = {q["id"] for q in bank["questions"]}
    for question in new_questions:
        validate_question(question, existing_ids)
        existing_ids.add(question["id"])
        bank["questions"].append(question)

    path.write_text(json.dumps(bank, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    return len(bank["questions"])


def main() -> int:
    for category, questions in NEW_QUESTIONS.items():
        if len(questions) != 100:
            print(f"ERROR: {category} has {len(questions)} questions, expected 100", file=sys.stderr)
            return 1
        counts: dict[str, int] = {}
        for q in questions:
            counts[q["difficulty"]] = counts.get(q["difficulty"], 0) + 1
        print(
            f"{category}: adding 100 ("
            f"{counts.get('easy', 0)} easy, {counts.get('medium', 0)} medium, {counts.get('hard', 0)} hard)"
        )

    print()
    for category in BANK_CONFIG:
        total = append_to_bank(category, NEW_QUESTIONS[category])
        print(f"{category}: {total} total questions")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
