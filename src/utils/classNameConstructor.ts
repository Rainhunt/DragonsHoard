export default function classNameConstructor(...names: (string | false | undefined)[]) {
    return names.filter(name => name).join(" ");
}