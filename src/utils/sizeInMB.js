export default (length) => { return `${Math.round((length / 1024 / 1024) * 100) / 100}MB`; }