import mongoose from "mongoose";
import FeatureFlag from "../models/featureFlag";
import Organization from "../models/organization";

export const createFlag = async (req, res) => {
    try {
        const { flag, description, isEnabled, organizationId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(organizationId)) {
            return res.status(400).json({ error: "Invalid Organization ID format" });
        }

        const orgExists = await Organization.findById(organizationId);
        if (!orgExists) {
            return res.status(404).json({ error: "Organization not found" });
        }

        const exFlag = await FeatureFlag.findOne({ flag, organizationId });
        if (exFlag) {
            return res.status(400).json({ error: "Feature flag already exists in this organization" });
        }

        const newFlag = await FeatureFlag.create({
            flag,
            description,
            isEnabled,
            organizationId
        });

        return res.status(201).json({ message: "Feature flag created"});
    } catch (err) {
        return res.status(500).json({ error: err.message || "Error creating feature flag" });
    }
};

export const updateFlag = async (req, res) => {
    try {
        const { id } = req.params;
        const { isEnabled } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Flag ID format" });
        }

        if (isEnabled === undefined) {
            return res.status(400).json({ error: "isEnabled field is required" });
        }

        const updatedFlag = await FeatureFlag.findByIdAndUpdate(id,{ isEnabled },{runValidators:true});
        if (!updatedFlag) {
            return res.status(404).json({ error: "Feature flag not found" });
        }

        return res.status(200).json({message: "Feature flag toggled successfully"});
    } catch (err) {
        return res.status(500).json({ error: err.message || "Error updating feature flag" });
    }
};

export const deleteFlag = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Flag ID format" });
        }

        const deletedFlag = await FeatureFlag.findByIdAndDelete(id);
        if (!deletedFlag) {
            return res.status(404).json({ error: "Feature flag not found" });
        }

        return res.status(200).json({ message: "Feature flag deleted"});
    } catch (err) {
        return res.status(500).json({ error: err.message || "Error deleting feature flag" });
    }
};

export const getFlagsByOrg = async (req, res) => {
    try {
        const { organizationId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(organizationId)) {
            return res.status(400).json({ error: "Invalid Organization ID format" });
        }

        const flags = await FeatureFlag.find({ organizationId });
        return res.status(200).json({ featureFlags: flags });
    } catch (err) {
        return res.status(500).json({ error: err.message || "Error fetching feature flags" });
    }
};