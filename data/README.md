## Import

# countries
mongoimport -d geonames -c countries --type tsv --file countryInfo.txt --columnsHaveTypes --fieldFile countries-header.txt --parseGrace autoCast

# cities
mongoimport -d geonames -c cities --type tsv --file cities15000.txt --columnsHaveTypes --fieldFile cities-header.txt --parseGrace autoCast

# alternatenames
mongoimport -d geonames -c alternatenames --type tsv --file alternateNamesV2.txt --columnsHaveTypes --fieldFile alternatenames-header.txt --parseGrace autoCast


## Indexes

# countries

db.countries.createIndex({ISO: 1})

# cities

db.cities.createIndex({geonameid: 1})

# alternatenames

db.alternatenames.createIndex({geonameid: 1})


## Aggregation

# alternatnames

db.alternatenames.aggregate([
	{ $match:
		{ $expr:
			{ $and: [
				{ $ne: ["$isolanguage", ""] },
				{ $ne: ["$isolanguage", "link"] },
				{ $ne: ["$isShortName", 1] },
				{ $ne: ["$isColloquial", 1] },
				{ $ne: ["$isHistoric", 1] }
				]
			}
		}
	},
	{ $out: "alternatenames" }
])

# cities

db.cities.aggregate([
	{ $lookup:
		{
			from: "countries",
			localField: "country code",
			foreignField: "ISO",
			as: "country"
		}
	},
	{ $unwind: "$country" },
	{ $out: "cities" }
])

db.cities.aggregate([
	{ $lookup:
		{
			from: "alternatenames",
			localField: "geonameid",
			foreignField: "geonameid",
			as: "alternatenames"
		}
	},
	{ $out: "cities" }
])

db.cities.aggregate([
	{ $addFields:
		{
			lang:
			{ $arrayElemAt:
				[ { $split: ["$country.Languages", ","] }, 0 ]
			}
		}
	},
	{ $addFields:
		{
			localname:
			{ $arrayElemAt: [
				{ $filter:
					{
						input: "$alternatenames",
						as: "name",
						cond:
						{ $eq:
							[
								{$substr: ["$$name.isolanguage", 0, 2]},
								{$substr: ["$lang", 0, 2]}
							]
						}
					}
				}, 0]
			}
		}
	},
	{ $addFields:
		{
			localname: "$localname.alternate name"
		}
	},
	{ $out: "cities" }
])
