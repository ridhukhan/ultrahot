import mongoose from "mongoose";

const dailyViewSchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, // বাংলাদেশ সময় অনুযায়ী তারিখ (যেমন: 2026-11-27)
  views: { type: Number, default: 0 },
});

const DailyView = mongoose.models.DailyView || mongoose.model("DailyView", dailyViewSchema);
export default DailyView;