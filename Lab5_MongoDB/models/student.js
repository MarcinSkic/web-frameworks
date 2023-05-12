const studentSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    mobile: Number,
    city: String,
});

module.exports = mongoose.model("Student", studentSchema);
