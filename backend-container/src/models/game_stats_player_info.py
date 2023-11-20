from mongoengine import DecimalField, Document, StringField, UUIDField, IntField, BooleanField, DateTimeField, EmbeddedDocument, EmbeddedDocumentListField


class player(EmbeddedDocument):
    longest = IntField()
    longest_touchdown = IntField()
    air_yards = IntField()
    assists = IntField()
    attempts = IntField()
    attempts_19 = IntField()
    attempts_29 = IntField()
    attempts_39 = IntField()
    attempts_49 = IntField()
    attempts_50 = IntField()
    avg_hang_time = DecimalField()
    avg_net_yards = IntField()
    avg_pocket_time = DecimalField()
    avg_yards = DecimalField()
    avg_yards = IntField()
    batted_passes = IntField()
    blitzes = IntField()
    blocked = IntField()
    broken_tackles = IntField()
    catchable_passes = IntField()
    category = StringField()
    cmp_pct = DecimalField()
    combined = IntField()
    completions = IntField()
    def_comps = IntField()
    def_targets = IntField()
    defended_passes = IntField()
    dropped_passes = IntField()
    endzone = IntField()
    ez_rec_tds = IntField()
    faircatches = IntField()
    faircatches = DecimalField()
    first_downs = IntField()
    forced_fumbles = IntField()
    fumble_recoveries = IntField()
    fumbles = IntField()
    hang_time = IntField()
    hurries = IntField()
    inside_20 = IntField()
    int_touchdowns = IntField()
    interceptions = IntField()
    kickoffs = IntField()
    kneel_downs = IntField()
    knockdowns = IntField()
    lost_fumbles = IntField()
    made = IntField()
    made_19 = IntField()
    made_29 = IntField()
    made_39 = IntField()
    made_49 = IntField()
    made_50 = IntField()
    misc_assists = IntField()
    misc_foced_fumbles = IntField()
    misc_fumble_recoveries = IntField()
    misc_tackles = IntField()
    missed = IntField()
    missed_tackles = IntField()
    net_yards = IntField()
    on_target_throws = IntField()
    onside_attempts = IntField()
    onside_successes = IntField()
    opp_rec = IntField()
    opp_rec_tds = IntField()
    opp_rec_yards = IntField()
    out_of_bounds = IntField()
    own_rec = IntField()
    own_rec_tds = IntField()
    own_rec_yards = IntField()
    passes_defended = IntField()
    pct = DecimalField()
    penalties = IntField()
    pocket_time = IntField()
    poor_throws = IntField()
    qb_hits = IntField()
    rating = DecimalField()
    receptions = IntField()
    redzone_attempts = IntField()
    redzone_targets = IntField()
    return_yards = IntField()
    return_yards = DecimalField()
    returns = IntField()
    sack_yards = IntField()
    sacks = IntField()
    safeties = IntField()
    scrambles = IntField()
    sp_assists = IntField()
    sp_blocks = IntField()
    sp_forced_fumbles = IntField()
    sp_fumble_recoveries = IntField()
    sp_tackles = IntField()
    spikes = IntField()
    squib_kicks = IntField()
    successes = IntField()
    tackles = IntField()
    targets = IntField()
    throw_aways = IntField()
    tloss = IntField()
    tloss_yards = IntField()
    tlost = IntField()
    tlost_yards = IntField()
    total_endzone = IntField()
    touchbacks = IntField()
    touchbacks = DecimalField()
    touchdowns = IntField()
    yards = IntField()
    yards = DecimalField()
    yards_after_catch = IntField()
    yards_after_contact = IntField()


class GameStatPlayerInfo(Document):
    _id = StringField(required=True)
    game_id = StringField(required=True)
    season_type = StringField(required=True)
    season_year = IntField(required=True)
    week = IntField(required=True)
    player = StringField(required=True)
    player_stats = EmbeddedDocumentListField(player)


meta = {"collection": "GameStatsPlayerInfo"}


def __str__(player):
    return "GameStatPlayerInfos: "