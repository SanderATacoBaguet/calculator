import sys
import json

def ohms_law(voltage=None, current=None, resistance=None):
    if voltage is None and current is not None and resistance is not None:
        return {"voltage": current * resistance}
    elif current is None and voltage is not None and resistance is not None:
        return {"current": voltage / resistance}
    elif resistance is None and voltage is not None and current is not None:
        return {"resistance": voltage / current}
    return {"error": "Provide exactly one missing value"}

if __name__ == "__main__":
    data = json.loads(sys.argv[1])  # Get JSON input
    if data["type"] == "ohms_law":
        result = ohms_law(
            voltage=data.get("voltage"),
            current=data.get("current"),
            resistance=data.get("resistance")
        )
        print(json.dumps(result))
    else:
        print(json.dumps({"error": "Unknown calculation type"}))
